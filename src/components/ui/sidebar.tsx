"use client";

import {
	BookOpenIcon,
	ChartBarIcon,
	ChevronDownIcon,
	HeartIcon,
	HomeIcon,
	UserIcon,
} from "@heroicons/react/24/outline";

import Image from "next/image";
import Link from "next/link";
import { Button } from "./button";
import { Separator } from "./separator";

const sidebarItems = [
	{
		icon: HomeIcon,
		label: "Home",
		href: "/",
	},
	{
		icon: BookOpenIcon,
		label: "Waifus",
		href: "/feed",
	},
	{
		icon: ChartBarIcon,
		label: "Arena",
		href: "/arena",
	},
];

export function Sidebar() {
	return (
		<div>
			<div className="fixed top-0 left-0 z-11 flex h-15 w-screen items-center justify-between bg-purple-950">
				<LogoText />
				<div className="mr-10">
					<UserProfile />
				</div>
			</div>
			<aside className="group fixed top-0 left-0 z-10 mt-15 flex h-[calc(100vh-60px)] w-15 flex-col justify-between overflow-hidden bg-purple-950 transition-all duration-300 hover:w-50">
				<div className="flex h-full flex-col">
					<SidebarList />
					<Separator className="my-2 ml-2 w-[90%] bg-purple-900" />
					<SidebarLogo />
				</div>
				<SidebarFooter />
			</aside>
		</div>
	);
}

export function LogoText() {
	return (
		<div className="flex items-center justify-center gap-2 px-4">
			<span className="font-semibold text-white text-xl">Waifu Feed</span>
			<HeartIcon className="h-8 w-8 flex-shrink-0 text-white " />
		</div>
	);
}

export function SidebarList() {
	return (
		<ul className="flex flex-col gap-2">
			{sidebarItems.map((item) => (
				<li key={item.href} className="relative flex min-h-10 items-center">
					<Link href={item.href} className="w-full">
						<Button
							variant="ghost"
							className="mt-1 h-12 w-full cursor-pointer items-center justify-start gap-2 text-white transition-all duration-300 hover:bg-purple-900"
						>
							<item.icon className="h-7 w-7 flex-shrink-0" />
							<span className="w-0 whitespace-nowrap font-semibold text-base opacity-0 transition-all duration-300 group-hover:w-auto group-hover:opacity-100">
								{item.label}
							</span>
						</Button>
					</Link>
				</li>
			))}
		</ul>
	);
}

export function UserProfile() {
	return (
		<div>
			<button
				type="button"
				className="flex cursor-pointer flex-row items-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-purple-900"
			>
				<div className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-200">
					<UserIcon className="h-5 w-5 text-neutral-500" />
				</div>
				<span className="font-semibold text-base text-white">John Doe</span>
				<ChevronDownIcon className="h-4 w-4 text-white" />
			</button>
		</div>
	);
}

export function SidebarLogo() {
	return (
		<div className="mt-2 ml-10 w-[100px] opacity-0 transition-all duration-300 group-hover:opacity-100">
			<Image
				src="/images/waifu-catalog-logo.png"
				alt="Logo"
				width={100}
				height={100}
				className="h-auto w-full"
			/>
		</div>
	);
}

export function SidebarFooter() {
	return (
		<div>
			<button
				type="button"
				className="flex cursor-pointer flex-row items-center gap-2 rounded-md p-2 transition-all duration-200 hover:bg-purple-900"
			>
				{""}
			</button>
		</div>
	);
}
