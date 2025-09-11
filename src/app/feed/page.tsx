"use client";
import { useEffect, useState } from "react";
import { ControlledPagination } from "~/components/controlled-pagination";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import { Separator } from "~/components/ui/separator";
import { useDebounce } from "~/hooks/useDebounce";
import { usePagination } from "~/hooks/usePagination";
import { TIME_CONSTANTS } from "~/lib/constants/time";
import { api } from "~/trpc/react";
import { WaifuCard } from "./_components/waifu-card";

import { WaifuCardSkeleton } from "./_components/waifu-skeleton";

const pageSizeOptions = [50, 100, 200];

export default function Feed() {
	const [searchTerms, setSearchTerms] = useState("");
	const debouncedSearchTerms = useDebounce(searchTerms, 500);

	const pagination = usePagination({ initialPageSize: 50 });

	const { data: waifus, isLoading } = api.waifu.all.useQuery(
		{
			take: pagination.take,
			skip: pagination.skip,
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
						<div className="mt-5 flex w-full flex-row justify-between gap-4">
							<div className="w-full">
								<Input
									placeholder="Search for a character"
									value={searchTerms}
									onChange={(e) => {
										setSearchTerms(e.target.value);
										pagination.firstPage();
									}}
									className="w-full"
								/>
							</div>
							<div>
								<Select
									onValueChange={(value) =>
										pagination.setPageSize(Number(value))
									}
									value={pagination.pageSize.toString()}
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
					</CardHeader>
					<CardContent>
						<div className="flex w-full flex-col gap-4">
							<Separator className="my-4" />
							{isLoading && <WaifuCardSkeleton />}
							<div className="grid w-full gap-1 lg:grid-cols-8">
								{!isLoading &&
									waifus &&
									waifus.data.map((waifu) => (
										<WaifuCard key={waifu.id} waifu={waifu} />
									))}
							</div>
							{!isLoading && waifus?.data?.length === 0 && (
								<p className="text-center text-white">No waifus found</p>
							)}
							<ControlledPagination
								pagination={pagination}
								paginationData={waifus?.pagination}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
