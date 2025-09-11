import { tagRaritys } from "~/lib/constants/common";
import { cn } from "~/lib/utils";

type props = {
	children: React.ReactNode;
	className?: string;
	rarity?: keyof typeof tagRaritys;
};

export function Tag({ children, className, rarity }: props) {
	const tagRarity = tagRaritys[rarity ?? "Common"];

	return (
		<div className={cn("rounded-md px-2 py-1", tagRarity, className)}>
			{children}
		</div>
	);
}
