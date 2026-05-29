import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock, type Stock } from '@/entities/trade-code/stock';

import { getFilteredStocks, type StockSortOption, type StockTrendFilter } from './stock-filters';

export function useStocksQuery(searchQuery: string, trendFilter: StockTrendFilter = 'all', sortOption: StockSortOption = 'name-asc') {
	return useGetAllStocksCodesSuspense({
		query: {
			refetchInterval: 60000,
			select: (data): Stock[] => {
				const mappedStocks = data.data.map(mapTradeCodeToStock);
				return getFilteredStocks({ stocks: mappedStocks, searchQuery, trendFilter, sortOption });
			},
		},
	});
}
