import { z } from "zod";
import type { AniListResponse } from "~/types/anilist";
import { CHARACTERS_QUERY, anilist } from "../../anilist";
import { db } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

const REQUEST_INTERVAL_MS = 700; // ~85 req/min
const mediaIdMap = new Map<number, number>(); // anilistId -> media.id

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const waifuRouter = createTRPCRouter({
	// /api/trpc/waifu.sync
	sync: publicProcedure
		.input(z.object({ startPage: z.number().default(1) }))
		.mutation(async ({ input }) => {
			let page = input.startPage;
			const perPage = 50;
			let processed = 0;

			while (true) {
				const data = (await anilist.request(CHARACTERS_QUERY, {
					page,
					perPage,
				})) as AniListResponse;

				// processar personagens individualmente para evitar timeout
				for (const c of data.Page.characters) {
					// idade mínima 13
					const age = c.age ? Number.parseInt(String(c.age), 10) : null;
					if (age && age < 13) continue;

					try {
						await db.$transaction(
							async (tx) => {
								// upsert da waifu
								const waifu = await tx.waifu.upsert({
									where: { anilistId: c.id },
									update: {
										name: c.name.full,
										gender: c.gender ?? "Unknown",
										description: c.description ?? "",
										image: c.image?.large ?? "",
										age: age ?? undefined,
									},
									create: {
										anilistId: c.id,
										name: c.name.full,
										gender: c.gender ?? "Unknown",
										description: c.description ?? "",
										image: c.image?.large ?? "",
										age: age ?? undefined,
									},
								});

								// processar mídias em lotes menores
								const mediaEdges = c.media?.edges ?? [];
								const mediaBatchSize = 5;

								for (let i = 0; i < mediaEdges.length; i += mediaBatchSize) {
									const mediaBatch = mediaEdges.slice(i, i + mediaBatchSize);

									for (const edge of mediaBatch) {
										const m = edge.node;

										// garantir mídia no banco
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

										// criar relação N:N
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
								}
							},
							{
								timeout: 10000, // 10 segundos por personagem
							},
						);

						processed++;

						// log a cada 10 processados
						if (processed % 10 === 0) {
							console.log(`✅ ${processed} waifus processadas até agora...`);
						}
					} catch (error) {
						console.error(
							`❌ Erro ao processar personagem ${c.name.full}:`,
							error,
						);
						// continua para o próximo personagem
					}
				}

				if (!data.Page.pageInfo.hasNextPage) {
					break;
				}

				page++;
				await sleep(REQUEST_INTERVAL_MS); // ≤ 90 req/min
			}

			return { message: "Sincronização concluída", processed };
		}),
});
