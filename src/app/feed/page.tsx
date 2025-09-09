"use client";
import { api } from "~/trpc/react";
import { WaifuCard } from "./_components/waifu-card";

export default function Feed() {
	const { data: waifus, isLoading } = api.waifu.all.useQuery(
		{
			take: 99,
			skip: 0,
		},
		{
			staleTime: 10 * 60 * 1000,
			gcTime: 30 * 60 * 1000,
		},
	);

	if (isLoading) return <div>Loading...</div>;

	if (!waifus) return <div>No waifus found</div>;

	return (
		<div className="flex gap-4">
			<div className="grid items-start lg:grid-cols-6 lg:px-20 lg:py-20">
				{waifus.data.map((waifu) => (
					<WaifuCard key={waifu.id} waifu={waifu} />
				))}
			</div>
		</div>
	);
}
