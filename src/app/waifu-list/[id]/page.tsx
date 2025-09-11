"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Tag } from "~/components/tag";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import { getRarity } from "~/lib/utils";
import { api } from "~/trpc/react";

export default function WaifuListPage() {
	const { id } = useParams();
	const { data: waifu, isLoading } = api.waifu.byId.useQuery({
		id: Number(id),
	});

	const rarity = waifu ? getRarity(waifu.favorites) : "Common";

	if (isLoading || !waifu)
		return (
			<div className="flex gap-4">
				<div className="my-10 flex w-full flex-col items-center gap-4">
					<Card className="w-7xl border-none bg-slate-950">
						<CardHeader>
							<Skeleton className="h-8 w-64" />
						</CardHeader>
						<CardContent>
							<div className="flex w-full flex-col gap-4">
								<div className="flex w-full flex-row gap-6">
									<Skeleton className="h-[345px] w-[230px] flex-shrink-0" />
									<div className="flex flex-1 flex-col gap-3">
										{Array.from({ length: 8 }).map((_, index) => (
											<Skeleton
												key={crypto.randomUUID()}
												className="h-6 w-full"
											/>
										))}
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);

	return (
		<div className="flex gap-4">
			<div className="my-10 flex w-full flex-col items-center gap-4">
				<Card className="w-7xl border-none bg-slate-950">
					<CardHeader>
						<CardTitle>
							<h1 className=" font-normal text-2xl text-white">
								{waifu?.name}
							</h1>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="flex w-full flex-col gap-4">
							<div className="flex w-full flex-row ">
								<Image
									src={waifu.image}
									alt={waifu.name}
									width={230}
									height={345}
									className="rounded-md "
								/>
								<div className="flex flex-col gap-2">
									<Tag rarity={rarity}>{rarity}</Tag>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
