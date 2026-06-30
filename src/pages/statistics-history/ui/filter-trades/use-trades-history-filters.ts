import { useUrlFilters } from '@/shared/lib/url-filters';

import { tradeFiltersSchema } from './trade-filters';

export function useTradesHistoryFilters() {
	const { filters, setFilters, setFilter } = useUrlFilters(tradeFiltersSchema);

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
