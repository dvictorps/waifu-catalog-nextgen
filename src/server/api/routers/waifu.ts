import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { waifuGetInput } from "./inputs/waifuInputs";

export const waifuRouter = createTRPCRouter({
	all: publicProcedure.input(waifuGetInput).query(async ({ input }) => {
		const { take, skip, searchTerms } = input;

		const [waifus, totalCount] = await Promise.all([
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
