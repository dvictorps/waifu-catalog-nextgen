import { z } from "zod";
import { db } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { getAllWaifus, waifuGetInput } from "../useCases/waifuUseCase";

export const waifuRouter = createTRPCRouter({
	all: publicProcedure.input(waifuGetInput).query(async ({ input }) => {
		return getAllWaifus(input);
	}),
	byId: publicProcedure
		.input(z.object({ id: z.number() }))
		.query(async ({ input }) => {
			const { id } = input;
			const waifu = await db.waifu.findUnique({
				where: { id },
			});
			return waifu;
		}),
});
