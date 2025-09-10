import { z } from "zod";
import { CHARACTERS_QUERY, anilist } from "~/server/graphql/anilist";
import type { AniListResponse } from "~/types/anilist";
import { db } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

const REQUEST_INTERVAL_MS = 700; // ~85 req/min

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const syncRouter = createTRPCRouter({
	sync: publicProcedure
		.input(z.object({ startPage: z.number().default(1) }))
		.mutation(async ({ input }) => {
			let page = input.startPage;
			const perPage = 25;
			let processed = 0;

			while (true) {
				const data = (await anilist.request(CHARACTERS_QUERY, {
					page,
					perPage,
				})) as AniListResponse;

				const validCharacters = data.Page.characters.filter((c) => {
					if (c.gender !== "Female") return false;

					const age = c.age ? Number.parseInt(String(c.age), 10) : null;
					if (age && age < 13) return false;

					return true;
				});

				const parallelBatchSize = 5;
				const characterBatches = [];

				for (let i = 0; i < validCharacters.length; i += parallelBatchSize) {
					characterBatches.push(
						validCharacters.slice(i, i + parallelBatchSize),
					);
				}

				for (const batch of characterBatches) {
					const promises = batch.map(async (c) => {
						try {
							await db.$transaction(
								async (tx) => {
									const waifu = await tx.waifu.upsert({
										where: { anilistId: c.id },
										update: {
											name: c.name.full,
											gender: c.gender ?? "Unknown",
											description: c.description ?? "",
											image: c.image?.large ?? "",
											age: c.age
												? Number.parseInt(String(c.age), 10)
												: undefined,
											favorites: c.favourites ?? 0,
										},
										create: {
											anilistId: c.id,
											name: c.name.full,
											gender: c.gender ?? "Unknown",
											description: c.description ?? "",
											image: c.image?.large ?? "",
											age: c.age
												? Number.parseInt(String(c.age), 10)
												: undefined,
											favorites: c.favourites ?? 0,
										},
									});

									const mediaEdges = c.media?.edges ?? [];
									for (const edge of mediaEdges) {
										const m = edge.node;

										const media = await tx.media.upsert({
											where: { anilistId: m.id },
											update: {
												title: m.title?.romaji ?? "",
												type: m.type ?? "UNKNOWN",
												image: m.coverImage?.large ?? null,
											},
											create: {
												anilistId: m.id,
												title: m.title?.romaji ?? "",
												type: m.type ?? "UNKNOWN",
												image: m.coverImage?.large ?? null,
											},
										});

										await tx.waifuMedia.upsert({
											where: {
												waifuId_mediaId: {
													waifuId: waifu.id,
													mediaId: media.id,
												},
											},
											update: {},
											create: { waifuId: waifu.id, mediaId: media.id },
										});
									}
								},
								{
									timeout: 15000,
								},
							);
							return { success: true, name: c.name.full };
						} catch (error) {
							console.error(`❌ Erro ao processar ${c.name.full}:`, error);
							return { success: false, name: c.name.full, error };
						}
					});

					const results = await Promise.allSettled(promises);

					const successes = results.filter(
						(r) => r.status === "fulfilled" && r.value.success,
					).length;
					processed += successes;

					if (processed % 10 === 0) {
						console.log(`✅ ${processed} waifus processadas até agora...`);
					}
				}

				if (!data.Page.pageInfo.hasNextPage) {
					break;
				}

				page++;
				await sleep(REQUEST_INTERVAL_MS);
			}

			return { message: "Sincronização concluída", processed };
		}),
});
