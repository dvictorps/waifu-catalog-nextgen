"use client";
import Image from "next/image";
import type { Waifu } from "~/types/waifu";

interface WaifuCardProps {
	waifu: Waifu;
}

export function WaifuCard({ waifu }: WaifuCardProps) {
	const waifuName = waifu.name.split(" ").slice(0, 2).join(" ");

	return (
		<div className="group h-60 max-w-36 rounded-md p-4">
			<div className="flex h-full w-full flex-col items-center justify-center">
				<h1
					className="z-10 flex min-h-[56px] items-center justify-center text-center font-bold text-white text-xl transition-all duration-300 group-hover:scale-110 "
					style={{ WebkitTextStroke: "1px #000" }}
				>
					{waifuName}
				</h1>
				<Image
					src={waifu.image}
					alt={waifu.name}
					width={100}
					height={100}
					className="rounded-md shadow-[0_0_30px] shadow-white/50 transition-all duration-400 group-hover:scale-110 "
				/>
			</div>
		</div>
	);
}
