import { queryOptions, type UseSuspenseQueryOptions } from '@tanstack/react-query';

import { getGetAllStocksCodesSuspenseQueryOptions } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock, type Stock } from '@/entities/trade-code/stock';

import { getFilteredStocks, type StockSortOption, type StockTrendFilter } from './stock-filters';

export function stocksQueryOptions(searchQuery: string, trendFilter: StockTrendFilter = 'all', sortOption: StockSortOption = 'name-asc') {
	const baseOptions = getGetAllStocksCodesSuspenseQueryOptions();

	return queryOptions({
		...baseOptions,
		select: (data) => {
			const mappedStocks = data.data.map(mapTradeCodeToStock);
			return getFilteredStocks({ stocks: mappedStocks, searchQuery, trendFilter, sortOption });
		},
	}) as unknown as UseSuspenseQueryOptions<any, any, Stock[]>;
}
