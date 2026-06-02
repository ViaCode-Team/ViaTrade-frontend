import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/hooks';
import { v } from '@/shared/model/validate';

import type { StockSortOption, StockTrendFilter } from '../model/stock-filters';

export const stockFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	listSort: v.fallback(
		v.picklist(['name-asc', 'name-desc', 'price-asc', 'price-desc', 'change-desc', 'change-asc']),
		'name-asc',
	),
	trendFilter: v.fallback(
		v.picklist(['all', 'gainers', 'losers']),
		'all',
	),
});

export function useStocksControls() {
	const { filters: urlFilters, setFilter } = useUrlFilters(stockFiltersSchema);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sortOption: urlFilters.listSort as StockSortOption,
			trendFilter: urlFilters.trendFilter as StockTrendFilter,
		}),
		[urlFilters.q, urlFilters.listSort, urlFilters.trendFilter],
	);

	return { filters, setFilter };
}
