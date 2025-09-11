import { tagRaritys } from "~/lib/constants/common";
import { newRocker } from "~/lib/fonts";
import { cn } from "~/lib/utils";

type props = {
	children: React.ReactNode;
	className?: string;
	rarity?: keyof typeof tagRaritys;
};

export function Tag({ children, className, rarity }: props) {
	const tagRarity = tagRaritys[rarity ?? "Common"];

	const fontRarity = {
		Common: "font-normal",
		Uncommon: "font-normal",
		Rare: "font-normal",
		Epic: "font-normal",
		Legendary: `${newRocker.className}`,
	};

	return (
		<div
			className={cn(
				"rounded-md px-2 py-1",
				tagRarity,
				fontRarity[rarity ?? "Common"],
				className,
			)}
		>
			{children}
		</div>
	);
}
