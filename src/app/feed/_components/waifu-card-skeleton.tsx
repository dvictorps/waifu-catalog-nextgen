import { Skeleton } from "~/components/ui/skeleton";

export function WaifuCardSkeleton() {
	return (
		<div className="group h-60 max-w-36 rounded-md p-4">
			<div className="flex h-full w-full flex-col items-center justify-center">
				<Skeleton className="mb-4 h-14 w-24 rounded-md" />

				<Skeleton className="h-24 w-24 rounded-md" />
			</div>
		</div>
	);
}
