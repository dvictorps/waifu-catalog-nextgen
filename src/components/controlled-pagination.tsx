import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "~/components/ui/pagination";
import type { PaginationObject } from "~/hooks/usePagination";

interface ControlledPaginationProps {
	pagination: PaginationObject;
}

export function ControlledPagination({
	pagination,
}: ControlledPaginationProps) {
	const { totalPages, hasPreviousPage, hasNextPage } = pagination.getPageInfo();

	const generatePageNumbers = () => {
		if (totalPages <= 1) return null;

		const maxVisible = 6;
		const currentPage = pagination.currentPage;

		if (totalPages <= maxVisible) {
			return Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
				<PaginationItem key={page}>
					<PaginationLink
						onClick={(e) => {
							e.preventDefault();
							pagination.goToPage(page);
						}}
						isActive={page === currentPage}
						className="cursor-pointer"
					>
						{page}
					</PaginationLink>
				</PaginationItem>
			));
		}

		const pages = [];

		pages.push(
			<PaginationItem key={1}>
				<PaginationLink
					onClick={(e) => {
						e.preventDefault();
						pagination.goToPage(1);
					}}
					isActive={1 === currentPage}
					className="cursor-pointer"
				>
					1
				</PaginationLink>
			</PaginationItem>,
		);

		if (currentPage > 3) {
			pages.push(
				<PaginationItem key="ellipsis-start">
					<PaginationEllipsis />
				</PaginationItem>,
			);
		}

		const start = Math.max(2, currentPage - 1);
		const end = Math.min(totalPages - 1, currentPage + 1);

		for (let page = start; page <= end; page++) {
			if (page !== 1 && page !== totalPages) {
				pages.push(
					<PaginationItem key={page}>
						<PaginationLink
							onClick={(e) => {
								e.preventDefault();
								pagination.goToPage(page);
							}}
							isActive={page === currentPage}
							className="cursor-pointer"
						>
							{page}
						</PaginationLink>
					</PaginationItem>,
				);
			}
		}

		if (currentPage < totalPages - 2) {
			pages.push(
				<PaginationItem key="ellipsis-end">
					<PaginationEllipsis />
				</PaginationItem>,
			);
		}

		if (totalPages > 1) {
			pages.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						onClick={(e) => {
							e.preventDefault();
							pagination.goToPage(totalPages);
						}}
						isActive={totalPages === currentPage}
						className="cursor-pointer"
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>,
			);
		}

		return pages;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						onClick={(e) => {
							e.preventDefault();
							pagination.previousPage();
						}}
						className={
							!hasPreviousPage
								? "pointer-events-none opacity-50"
								: "cursor-pointer"
						}
					/>
				</PaginationItem>

				{generatePageNumbers()}

				<PaginationItem>
					<PaginationNext
						onClick={(e) => {
							e.preventDefault();
							pagination.nextPage();
						}}
						className={
							!hasNextPage ? "pointer-events-none opacity-50" : "cursor-pointer"
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
