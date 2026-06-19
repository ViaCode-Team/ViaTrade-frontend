import { useMemo } from 'react';

import type { StockSortOption } from '@/entities/stock';

import { useUrlFilters } from '@/shared/lib/hooks';
import { v } from '@/shared/model';

export const stockFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	listSort: v.fallback(
		v.picklist(['name-asc', 'name-desc']),
		'name-asc',
	),
});

export function useStocksControls() {
	const { filters: urlFilters, setFilter } = useUrlFilters(stockFiltersSchema);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sortOption: urlFilters.listSort as StockSortOption,
		}),
		[urlFilters.q, urlFilters.listSort],
	);

	return { filters, setFilter };
}
