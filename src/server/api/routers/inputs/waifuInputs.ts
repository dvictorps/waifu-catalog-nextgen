import z from "zod";

export const waifuGetInput = z.object({
	take: z.number().min(1).max(200).default(20),
	skip: z.number().min(0).default(0),
	searchTerms: z.string().optional(),
});
