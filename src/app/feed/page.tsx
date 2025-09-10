"use client";

import { useState } from "react";

import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";

import { Separator } from "~/components/separator";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";

import { useDebounce } from "~/hooks/useDebounce";
import { TIME_CONSTANTS } from "~/lib/constants/time";
import { api } from "~/trpc/react";
import { WaifuCard } from "./_components/waifu-card";
import { WaifuGridSkeleton } from "./_components/waifu-grid-skeleton";

const pageSizeOptions = [20, 50, 100];

export default function Feed() {
	const [searchTerms, setSearchTerms] = useState("");
	const [pageSize, setPageSize] = useState(20);
	const debouncedSearchTerms = useDebounce(searchTerms, 500);

	const { data: waifus, isLoading } = api.waifu.all.useQuery(
		{
			take: pageSize,
			skip: 0,
			searchTerms: debouncedSearchTerms,
		},
		{
			staleTime: TIME_CONSTANTS.ONE_HOUR,
			gcTime: TIME_CONSTANTS.ONE_HOUR,
			trpc: {
				abortOnUnmount: true,
			},
		},
	);

	return (
		<div className="flex gap-4">
			<div className="my-10 flex w-full flex-col items-center gap-4">
				<Card className="w-7xl border-none bg-slate-950">
					<CardHeader>
						<CardTitle className="text-white">Character list</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex w-full flex-col gap-4">
							<div className="flex w-full flex-row justify-between gap-4">
								<div className="w-full">
									<Input
										placeholder="Search for a character"
										value={searchTerms}
										onChange={(e) => setSearchTerms(e.target.value)}
										className="w-full"
									/>
								</div>
								<div>
									<Select
										onValueChange={(value) => setPageSize(Number(value))}
										value={pageSize.toString()}
									>
										<SelectTrigger className="flex items-start justify-between">
											<div className="flex flex-row gap-2">
												<span className="font-normal text-neutral-400">
													Page size:
												</span>
												<SelectValue placeholder="Select a page size" />
											</div>
										</SelectTrigger>
										<SelectContent>
											{pageSizeOptions.map((size) => (
												<SelectItem key={size} value={size.toString()}>
													{size}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
								</div>
							</div>
							<Separator className="my-4" />
							{isLoading && <WaifuGridSkeleton count={8} />}

							{!isLoading && waifus && (
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
