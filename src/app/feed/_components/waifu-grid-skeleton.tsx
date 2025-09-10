import { WaifuCardSkeleton } from "./waifu-card-skeleton";

interface WaifuGridSkeletonProps {
	count?: number;
}

export function WaifuGridSkeleton({ count = 8 }: WaifuGridSkeletonProps) {
	return (
		<div className="grid w-full gap-1 lg:grid-cols-8">
			{Array.from({ length: count }, (_, index) => (
				<WaifuCardSkeleton key={`skeleton-${index}`} />
			))}
		</div>
	);
}
