"use client";

import { useState } from "react";

import { Separator } from "~/components/separator";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { TIME_CONSTANTS } from "~/lib/constants/time";
import { api } from "~/trpc/react";
import { WaifuCard } from "./_components/waifu-card";
import { WaifuGridSkeleton } from "./_components/waifu-grid-skeleton";

export default function Feed() {
	const [searchTerms, setSearchTerms] = useState("");

	const { data: waifus, isLoading } = api.waifu.all.useQuery(
		{
			take: 99,
			skip: 0,
			searchTerms: searchTerms,
		},
		{
			staleTime: TIME_CONSTANTS.ONE_HOUR,
			gcTime: TIME_CONSTANTS.ONE_HOUR,
			trpc: {
				abortOnUnmount: true,
			},
		},
	);

	if (!waifus) return <div>No waifus found</div>;

	return (
		<div className="flex gap-4">
			<div className="my-10 flex w-full flex-col items-center gap-4">
				<Card className="border-none bg-slate-950">
					<CardHeader>
						<CardTitle className="text-white">Character list</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex w-full flex-col gap-4">
							<div>
								<Input
									placeholder="Search for a character"
									value={searchTerms}
									onChange={(e) => setSearchTerms(e.target.value)}
								/>
							</div>
							<Separator className="my-4" />
							{isLoading ? (
								<WaifuGridSkeleton count={8} />
							) : (
								<div className="grid w-full gap-1 lg:grid-cols-8">
									{waifus.data.map((waifu) => (
										<WaifuCard key={waifu.id} waifu={waifu} />
									))}
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
