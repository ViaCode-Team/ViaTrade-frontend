import { useUrlFilters } from '@/shared/lib/hooks';

import { defaultTradeFilters } from '../model/trade-filters';

export function useTradesHistoryFilters() {
	const { filters, setFilters, setFilter } = useUrlFilters(defaultTradeFilters);
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
