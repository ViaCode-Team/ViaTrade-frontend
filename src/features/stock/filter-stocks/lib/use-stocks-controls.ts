import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/hooks';

import type { StockSortOption, StockTrendFilter } from '../model/stock-filters';

const defaultFilters = {
	q: '',
	sort: 'name-asc' as StockSortOption,
	trend: 'all' as StockTrendFilter,
};

export function useStocksControls() {
	const { filters: urlFilters, setFilter } = useUrlFilters(defaultFilters);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sortOption: urlFilters.sort,
			trendFilter: urlFilters.trend,
		}),
		[urlFilters.q, urlFilters.sort, urlFilters.trend],
	);

	return { filters, setFilter };
}
