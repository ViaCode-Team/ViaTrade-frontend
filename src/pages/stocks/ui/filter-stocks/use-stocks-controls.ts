import { useMemo } from 'react';

import type { StockSortOption } from '@/entities/stock';

import { useUrlFilters } from '@/shared/lib/url-filters';
import { v } from '@/shared/lib/validation';

export const stockFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	page: v.fallback(v.string(), '1'),
	listSort: v.fallback(
		v.picklist(['name-asc', 'name-desc']),
		'name-asc',
	),
});

export function useStocksControls() {
	const {
		filters: urlFilters,
		setFilters,
		resetFilters,
	} = useUrlFilters(stockFiltersSchema);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sortOption: urlFilters.listSort as StockSortOption,
			page: Math.max(Number(urlFilters.page) || 1, 1),
		}),
		[urlFilters.q, urlFilters.listSort, urlFilters.page],
	);

	return { filters, setFilters, resetFilters };
}
