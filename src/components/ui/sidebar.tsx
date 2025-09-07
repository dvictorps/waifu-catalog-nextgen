"use client";

import { HomeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../separator";
import { Button } from "./button";

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
			<ul>
				<li>
					<Link href="/">
						<Button
							variant="ghost"
							className="flex w-full justify-start text-white hover:bg-purple-900"
						>
							<span className="flex flex-row gap-2">
								<HomeIcon /> Home
							</span>
						</Button>
					</Link>
				</li>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/">Home</Link>
				</li>
			</ul>
		</aside>
	);
}
