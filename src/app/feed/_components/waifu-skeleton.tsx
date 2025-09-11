import { Skeleton } from "~/components/ui/skeleton";

function WaifuSkeleton() {
	return (
		<div className="group h-60 max-w-36 rounded-md p-4">
			<div className="flex h-full w-full flex-col items-center justify-center">
				<Skeleton className="mb-4 h-14 w-24 rounded-md" />

				<Skeleton className="h-24 w-24 rounded-md" />
			</div>
		</div>
	);
}

function WaifuGridSkeleton({ count = 8 }: { count?: number }) {
	return (
		<div className="grid w-full gap-1 lg:grid-cols-8">
			{Array.from({ length: count }).map(() => (
				<WaifuSkeleton key={crypto.randomUUID()} />
			))}
		</div>
	);
}

function WaifuCardSkeleton() {
	return (
		<>
			<WaifuGridSkeleton />
			<WaifuGridSkeleton />
			<WaifuGridSkeleton />
		</>
	);
}

export { WaifuCardSkeleton, WaifuGridSkeleton, WaifuSkeleton };
