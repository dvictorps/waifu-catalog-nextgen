import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

export const waifuRouter = createTRPCRouter({
	all: publicProcedure
		.input(
			z.object({
				take: z.number().min(1).max(100).default(20),
				skip: z.number().min(0).default(0),
			}),
		)
		.query(async ({ input }) => {
			const { take, skip } = input;

			const [waifus, totalCount] = await Promise.all([
				db.waifu.findMany({
					orderBy: {
						favorites: "desc",
					},
					select: {
						id: true,
						name: true,
						image: true,
					},
					take,
					skip,
				}),
				db.waifu.count(),
			]);

			return {
				data: waifus,
				pagination: {
					total: totalCount,
					take,
					skip,
					hasNextPage: skip + take < totalCount,
					hasPreviousPage: skip > 0,
				},
			};
		}),
});
