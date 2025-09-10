"use client";
import { TIME_CONSTANTS } from "~/lib/constants/time";
import { api } from "~/trpc/react";
import { WaifuCard } from "./_components/waifu-card";

export default function Feed() {
	const { data: waifus, isLoading } = api.waifu.all.useQuery(
		{
			take: 99,
			skip: 0,
		},
		{
			staleTime: TIME_CONSTANTS.ONE_HOUR,
			gcTime: TIME_CONSTANTS.ONE_HOUR,
		},
	);

	if (isLoading) return <div>Loading...</div>;

	if (!waifus) return <div>No waifus found</div>;

	return (
		<div className="flex gap-4">
			<div className="grid w-full lg:grid-cols-6 lg:px-20 lg:py-20">
				{waifus.data.map((waifu) => (
					<WaifuCard key={waifu.id} waifu={waifu} />
				))}
			</div>
		</div>
	);
}
