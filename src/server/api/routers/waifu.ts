import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { waifuGetInput } from "./inputs/waifuInputs";

export const waifuRouter = createTRPCRouter({
	all: publicProcedure.input(waifuGetInput).query(async ({ input }) => {
		const { take, skip, searchTerms } = input;

		const [waifus, totalCount, totalPaginated] = await Promise.all([
			db.waifu.findMany({
				orderBy: {
					favorites: "desc",
				},
				where: {
					name: {
						contains: searchTerms,
						mode: "insensitive",
					},
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
			db.waifu.count({
				where: {
					name: {
						contains: searchTerms,
						mode: "insensitive",
					},
				},
			}),
		]);

		return {
			data: waifus,
			pagination: {
				total: totalCount,
				totalPaginated,
				take,
				skip,
				hasNextPage: skip + take < totalPaginated,
				hasPreviousPage: skip > 0,
			},
		};
	}),
});
