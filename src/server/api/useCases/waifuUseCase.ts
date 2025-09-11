import z from "zod";
import { anilistDefaultImage } from "~/lib/constants/anilist";
import { db } from "../../db";

export const waifuGetInput = z.object({
	take: z.number().min(1).max(200).default(20),
	skip: z.number().min(0).default(0),
	searchTerms: z.string().optional(),
});

export async function getAllWaifus(input: z.infer<typeof waifuGetInput>) {
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
				image: {
					not: anilistDefaultImage,
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
				image: {
					not: anilistDefaultImage,
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
}
