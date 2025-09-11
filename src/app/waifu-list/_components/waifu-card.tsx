import Image from "next/image";
import Link from "next/link";
import type { Waifu, WaifuList } from "~/types/waifu";

interface WaifuCardProps {
	waifu: WaifuList["data"][number];
}

export function WaifuCard({ waifu }: WaifuCardProps) {
	if (!waifu) return null;

	const waifuName = waifu.name.split(" ").slice(0, 2).join(" ");

	return (
		<button
			type="button"
			className="group h-60 max-w-36 rounded-md p-4 transition-all duration-300 hover:scale-110"
		>
			<Link href={`/waifu-list/${waifu.id}`}>
				<div className="flex h-full w-full flex-col items-center justify-center">
					<h1
						className="z-10 flex min-h-[56px] items-center justify-center text-center font-bold text-white text-xl "
						style={{ WebkitTextStroke: "1px #000" }}
					>
						{waifuName}
					</h1>
					<Image
						src={waifu.image}
						alt={waifu.name}
						width={100}
						height={150}
						className="rounded-md border-2 border-white "
					/>
				</div>
			</Link>
		</button>
	);
}
