"use client";

import {
	BookHeartIcon,
	ChartSpline,
	HeartPulse,
	HeartPulseIcon,
	HomeIcon,
	LogOutIcon,
	UserIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Separator } from "../separator";
import { Button } from "./button";

const sidebarItems = [
	{
		icon: HomeIcon,
		label: "Home",
		href: "/",
	},
	{
		icon: BookHeartIcon,
		label: "Waifus",
		href: "/feed",
	},
	{
		icon: ChartSpline,
		label: "Arena",
		href: "/arena",
	},
];

export function Sidebar() {
	return (
		<aside className="group fixed top-0 left-0 z-10 flex h-screen w-15 flex-col justify-between bg-purple-950 p-3 transition-all duration-300 hover:w-64">
			<div className="flex h-full flex-col">
				<SidebarHeader />
				<Separator className="bg-purple-900" />
				<SidebarList />
			</div>
		</aside>
	);
}

export function SidebarHeader() {
	return (
		<div className="flex min-h-[150px] items-center justify-center">
			<Image
				src="/images/waifu-catalog-logo.png"
				alt="Logo"
				width={150}
				height={150}
				className="hidden group-hover:block"
			/>
			<HeartPulse className="block h-10 w-10 text-white group-hover:hidden" />
		</div>
	);
}

export function SidebarList() {
	return (
		<ul className="flex flex-col gap-4">
			{sidebarItems.map((item) => (
				<li
					key={item.href}
					className="flex min-h-10 items-center justify-center group-hover:block group-hover:items-baseline group-hover:justify-normal"
				>
					<Link href={item.href}>
						<Button
							variant="ghost"
							className="mt-1 w-full cursor-pointer justify-start gap-2 text-white hover:bg-purple-900"
						>
							<item.icon className="min-h-6 min-w-6" />
							<span className="hidden transition-all duration-300 group-hover:block">
								{item.label}
							</span>
						</Button>
					</Link>
				</li>
			))}
		</ul>
	);
}
