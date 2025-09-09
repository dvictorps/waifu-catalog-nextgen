"use client";

import {
	BookHeartIcon,
	ChartSpline,
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
		<aside className="fixed top-0 left-0 z-10 flex h-screen w-64 flex-col justify-between bg-purple-950 p-3">
			<div className="flex h-full flex-col">
				<SidebarHeader />
				<Separator className="bg-purple-900" />
				<SidebarList />
			</div>
			<Separator className="my-2 bg-purple-900" />
			<SidebarFooter />
		</aside>
	);
}

export function SidebarHeader() {
	return (
		<div className="flex items-center justify-center">
			<Image
				src="/images/waifu-catalog-logo.png"
				alt="Logo"
				width={150}
				height={150}
			/>
		</div>
	);
}

export function SidebarFooter() {
	return (
		<div>
			<div className="flex cursor-default flex-row items-center gap-2">
				<div className="flex w-full flex-row items-center gap-2 rounded-md p-1 hover:bg-purple-900">
					<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 p-1">
						<UserIcon className="text-gray-500" />
					</div>
					<div className="flex flex-col">
						<span className="text-white">Victor Pereira</span>
						<span className="text-white text-xs">Administrador</span>
					</div>
				</div>
				<Button
					variant="ghost"
					className="ml-auto cursor-pointer text-white hover:bg-purple-900"
				>
					<LogOutIcon />
				</Button>
			</div>
		</div>
	);
}

export function SidebarList() {
	return (
		<ul>
			{sidebarItems.map((item) => (
				<li key={item.href}>
					<Link href={item.href}>
						<Button
							variant="ghost"
							className="mt-1 flex w-full cursor-pointer justify-start gap-2 text-white hover:bg-purple-900"
						>
							<item.icon /> {item.label}
						</Button>
					</Link>
				</li>
			))}
		</ul>
	);
}
