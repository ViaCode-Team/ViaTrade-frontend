import { queryOptions } from '@tanstack/react-query';

import { mockStocks } from '@/entities/stock';

import { getFilteredStocks, type StockSortOption, type StockTrendFilter } from './stock-filters';

async function fetchStocks(searchQuery: string, trendFilter: StockTrendFilter, sortOption: StockSortOption) {
	// Simulate network delay for Suspense to trigger
	await new Promise((resolve) => setTimeout(resolve, 800));

	return getFilteredStocks({ stocks: mockStocks, searchQuery, trendFilter, sortOption });
}

export function stocksQueryOptions(searchQuery: string, trendFilter: StockTrendFilter = 'all', sortOption: StockSortOption = 'name-asc') {
	return queryOptions({
		queryKey: ['stocks', searchQuery, trendFilter, sortOption],
		queryFn: () => fetchStocks(searchQuery, trendFilter, sortOption),
	});
}
