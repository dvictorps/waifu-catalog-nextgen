"use client";
import { WaifuCard } from "./_components/waifu-card";

const waifuPlaceholder = [
	{
		name: "Roxy Migurdia 1",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
	{
		name: "Roxy Migurdia 2",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
	{
		name: "Roxy Migurdia 3",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
	{
		name: "Roxy Migurdia 4",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
	{
		name: "Roxy Migurdia 5  ",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
	{
		name: "Roxy Migurdia 6",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
	{
		name: "Roxy Migurdia 7",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
	{
		name: "Roxy Migurdia 8",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
	{
		name: "Roxy Migurdia 9",
		image:
			"https://s4.anilist.co/file/anilistcdn/character/large/b88350-QU1iwgZ887U8.png",
		description:
			"Roxy Migurdia is a talented mage from the Migurd race, and a former magic tutor. Because she can't use telepathy, she left her village due to feeling isolated from her peers. Unable to make a stable living as an adventurer, she became a travelling tutor and eventually becomes Rudeus' teacher.",
	},
];

export default function Feed() {
	return (
		<div className="flex gap-4">
			<div className="grid items-start lg:grid-cols-7 lg:px-20 lg:py-20">
				{waifuPlaceholder.map((waifu) => (
					<WaifuCard key={waifu.name} waifu={waifu} />
				))}
			</div>
		</div>
	);
}
