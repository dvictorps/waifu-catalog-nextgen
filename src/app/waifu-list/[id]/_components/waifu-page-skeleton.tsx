import { Card, CardContent, CardHeader } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";

export function WaifuPageSkeleton() {
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
									{Array.from({ length: 8 }).map(() => (
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
}
