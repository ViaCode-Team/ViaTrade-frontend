import { queryOptions } from '@tanstack/react-query';

import { mockStocks } from '@/entities/stock';

import { getFilteredStocks } from './stock-filters';

async function fetchStocks(searchQuery: string) {
	// Simulate network delay for Suspense to trigger
	await new Promise((resolve) => setTimeout(resolve, 800));

	return getFilteredStocks({ stocks: mockStocks, searchQuery });
}

export function stocksQueryOptions(searchQuery: string) {
	return queryOptions({
		queryKey: ['stocks', searchQuery],
		queryFn: () => fetchStocks(searchQuery),
	});
}
