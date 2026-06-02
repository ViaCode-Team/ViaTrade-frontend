import { useTradesHistoryFiltersContext } from './trades-history-filters-context';

export function useTradesHistoryFilters() {
	const { filters, setFilters, setFilter } = useTradesHistoryFiltersContext();

	const {
		q,
		typeFilter,
		statusFilter,
		fieldSort,
		directionSort,
	} = filters;
	const page = Number(filters.page) || 1;

	return {
		q,
		typeFilter,
		statusFilter,
		fieldSort,
		directionSort,
		page,
		setFilters,
		setFilter,
	};
}
