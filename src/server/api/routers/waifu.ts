import { z } from "zod";
import type { AniListResponse } from "~/types/anilist";
import { CHARACTERS_QUERY, anilist } from "../../anilist";
import { db } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

const REQUEST_INTERVAL_MS = 700; // ~85 req/min

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const waifuRouter = createTRPCRouter({
	// /api/trpc/waifu.sync
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

				// filtrar personagens válidos primeiro
				const validCharacters = data.Page.characters.filter((c) => {
					// filtrar apenas personagens femininos
					if (c.gender !== "Female") return false;

					// idade mínima 13
					const age = c.age ? Number.parseInt(String(c.age), 10) : null;
					if (age && age < 13) return false;

					return true;
				});

				// processar em paralelo (lotes de 5 personagens simultâneos)
				const parallelBatchSize = 5;
				const characterBatches = [];

				for (let i = 0; i < validCharacters.length; i += parallelBatchSize) {
					characterBatches.push(
						validCharacters.slice(i, i + parallelBatchSize),
					);
				}

				// processar cada lote em paralelo
				for (const batch of characterBatches) {
					const promises = batch.map(async (c) => {
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

									// processar mídias
									const mediaEdges = c.media?.edges ?? [];
									for (const edge of mediaEdges) {
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
								},
								{
									timeout: 15000, // 15 segundos por personagem
								},
							);
							return { success: true, name: c.name.full };
						} catch (error) {
							console.error(`❌ Erro ao processar ${c.name.full}:`, error);
							return { success: false, name: c.name.full, error };
						}
					});

					// aguardar lote paralelo completar
					const results = await Promise.allSettled(promises);

					// contar sucessos
					const successes = results.filter(
						(r) => r.status === "fulfilled" && r.value.success,
					).length;
					processed += successes;

					// log a cada 10 processados
					if (processed % 10 === 0) {
						console.log(`✅ ${processed} waifus processadas até agora...`);
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

	all: publicProcedure.query(async () => {
		return db.waifu.findMany({
			select: {
				id: true,
				name: true,
				image: true,
			},
		});
	}),
});
