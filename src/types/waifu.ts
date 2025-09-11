import type { inferRouterOutputs } from "@trpc/server";
import type { appRouter } from "~/server/api/root";

export type InferRouteOutputs = inferRouterOutputs<typeof appRouter>;
export type Waifu = InferRouteOutputs["waifu"]["all"]["data"][number];
