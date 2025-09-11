import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { tagRaritys } from "./constants/common";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function getRarity(favorites: number): keyof typeof tagRaritys {
	if (favorites >= 20001) return "Legendary";
	if (favorites >= 15001) return "Epic";
	if (favorites >= 10001) return "Rare";
	if (favorites >= 5001) return "Uncommon";
	return "Common";
}
