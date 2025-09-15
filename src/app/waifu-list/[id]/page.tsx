"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

import { Tag } from "~/components/tag";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { getRarity } from "~/lib/utils";
import { api } from "~/trpc/react";
import { WaifuPageSkeleton } from "./_components/waifu-page-skeleton";

export default function WaifuListPage() {
	const { id } = useParams();
	const { data: waifu, isLoading } = api.waifu.byId.useQuery({
		id: Number(id),
	});

	const rarity = getRarity(waifu?.favorites ?? 0);

	if (isLoading || !waifu) return <WaifuPageSkeleton />;

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
							<div className="flex w-full flex-row gap-6">
								<Image
									src={waifu.image}
									alt={waifu.name}
									width={230}
									height={345}
									className="max-h-[345px] max-w-[230px] rounded-md border-1 border-white"
								/>
								<div className="flex w-full flex-col gap-2">
									<Tag className="max-w-fit" rarity={rarity}>
										{rarity}
									</Tag>
									<div className="flex flex-row gap-2">
										<Label>Age:</Label> <span>{waifu.age ?? "Unknown"}</span>
									</div>
									<Accordion type="single" collapsible className="w-full">
										<AccordionItem value="item-1">
											<AccordionTrigger className="w-full ">
												Description
											</AccordionTrigger>
											<AccordionContent className="overflow-y-auto">
												<div className="flex flex-col gap-2 rounded-md border border-blue-500 bg-slate-800 p-4 text-sm">
													<ReactMarkdown>{waifu.description}</ReactMarkdown>
												</div>
											</AccordionContent>
										</AccordionItem>
									</Accordion>
								</div>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
