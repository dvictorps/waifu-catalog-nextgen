export interface AniListPageInfo {
	currentPage: number;
	lastPage: number;
	hasNextPage: boolean;
}

export interface AniListName {
	full: string;
	first?: string;
	last?: string;
	native?: string;
}

export interface AniListImage {
	large: string;
	medium?: string;
}

export interface AniListTitle {
	romaji: string;
	english?: string;
	native?: string;
}

export interface AniListCoverImage {
	large: string;
	medium?: string;
}

export interface AniListDateOfBirth {
	year?: number;
	month?: number;
	day?: number;
}

export interface AniListMediaNode {
	id: number;
	type: string;
	title: AniListTitle;
	coverImage: AniListCoverImage;
	format?: string;
	status?: string;
	episodes?: number;
	chapters?: number;
	volumes?: number;
}

export interface AniListMediaEdge {
	characterRole?: string;
	node: AniListMediaNode;
}

export interface AniListMedia {
	edges: AniListMediaEdge[];
}

export interface AniListCharacter {
	id: number;
	name: AniListName;
	gender?: string;
	description?: string;
	image: AniListImage;
	age?: string | null;
	dateOfBirth?: AniListDateOfBirth;
	media: AniListMedia;
}

export interface AniListPage {
	pageInfo: AniListPageInfo;
	characters: AniListCharacter[];
}

export interface AniListResponse {
	Page: AniListPage;
}
