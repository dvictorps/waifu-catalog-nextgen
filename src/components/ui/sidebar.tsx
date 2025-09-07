"use client";

import Image from "next/image";
import { Separator } from "../separator";

export function Sidebar() {
	return (
		<aside className="flex h-full w-1/7 flex-col bg-purple-950 p-3">
			<div className="flex items-center justify-center">
				<Image
					src="/images/waifu-catalog-logo.png"
					alt="Logo"
					width={150}
					height={150}
				/>
			</div>
			<Separator className="bg-purple-900" />
		</aside>
	);
}
