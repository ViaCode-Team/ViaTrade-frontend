export type PaginationConfig = {
	page: number;
	totalPages: number;
	onPageChange: (page: number) => void;
};
