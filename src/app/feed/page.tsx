"use client";
import { api } from "~/trpc/react";
import { WaifuCard } from "./_components/waifu-card";

export default function Feed() {
	const { data: waifus, isLoading } = api.waifu.all.useQuery();

	if (isLoading) return <div>Loading...</div>;

	if (!waifus) return <div>No waifus found</div>;

	return (
		<div className="flex gap-4">
			<div className="grid items-start lg:grid-cols-4 lg:px-20 lg:py-20">
				{waifus.map((waifu) => (
					<WaifuCard key={waifu.id} waifu={waifu} />
				))}
			</div>
		</div>
	);
}
