import { useCallback, useMemo, useState } from "react";

interface PaginationData {
	total: number;
	take: number;
	skip: number;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
}

interface UsePaginationOptions {
	initialPageSize?: number;
	initialPage?: number;
}

export interface PaginationObject {
	currentPage: number;
	pageSize: number;
	take: number;
	skip: number;

	nextPage: () => void;
	previousPage: () => void;
	goToPage: (page: number) => void;
	firstPage: () => void;
	lastPage: (totalPages: number) => void;
	setPageSize: (size: number) => void;

	getPageInfo: (paginationData?: PaginationData) => {
		totalPages: number;
		hasNextPage: boolean;
		hasPreviousPage: boolean;
		currentPageItems: number;
		totalItems: number;
		startItem: number;
		endItem: number;
	};
}

export function usePagination(
	options: UsePaginationOptions = {},
): PaginationObject {
	const { initialPageSize = 20, initialPage = 1 } = options;

	const [currentPage, setCurrentPage] = useState(initialPage);
	const [pageSize, setPageSizeState] = useState(initialPageSize);

	const take = pageSize;
	const skip = (currentPage - 1) * pageSize;

	const goToNextPage = useCallback(() => {
		setCurrentPage((prev) => prev + 1);
	}, []);

	const goToPreviousPage = useCallback(() => {
		setCurrentPage((prev) => Math.max(1, prev - 1));
	}, []);

	const goToPage = useCallback((page: number) => {
		setCurrentPage(Math.max(1, page));
	}, []);

	const goToFirstPage = useCallback(() => {
		setCurrentPage(1);
	}, []);

	const goToLastPage = useCallback((totalPages: number) => {
		setCurrentPage(Math.max(1, totalPages));
	}, []);

	const setPageSize = useCallback((size: number) => {
		setPageSizeState(size);
		setCurrentPage(1);
	}, []);

	const getPageInfo = useCallback(
		(paginationData?: PaginationData) => {
			if (!paginationData) {
				return {
					totalPages: 1,
					hasNextPage: false,
					hasPreviousPage: false,
					currentPageItems: 0,
					totalItems: 0,
					startItem: 0,
					endItem: 0,
				};
			}

			const { total, hasNextPage, hasPreviousPage } = paginationData;
			const totalPages = Math.ceil(total / pageSize);
			const startItem = skip + 1;
			const endItem = Math.min(skip + take, total);
			const currentPageItems = endItem - startItem + 1;

			return {
				totalPages,
				hasNextPage,
				hasPreviousPage,
				currentPageItems,
				totalItems: total,
				startItem: startItem > total ? 0 : startItem,
				endItem: endItem > total ? total : endItem,
			};
		},
		[pageSize, skip, take],
	);

	return {
		currentPage,
		pageSize,
		take,
		skip,
		nextPage: goToNextPage,
		previousPage: goToPreviousPage,
		goToPage,
		firstPage: goToFirstPage,
		lastPage: goToLastPage,
		setPageSize,
		getPageInfo,
	};
}
