import { getFilteredStocks, mapTradeCodeToStock, type Stock, type StockSortOption } from '@/entities/stock';
import {
	useGetAllStocksCodes,
	useGetAllStocksCodesSuspense,
} from '@/entities/trade-code';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

export function useStocksQuerySuspense(searchQuery: string, sortOption: StockSortOption = 'name-asc') {
	return useGetAllStocksCodesSuspense({
		query: {
			refetchInterval: QUERY_REFETCH_INTERVAL,
			select: (data): Stock[] => {
				const mappedStocks = data.data.map(mapTradeCodeToStock);
				return getFilteredStocks({ stocks: mappedStocks, searchQuery, sortOption });
			},
		},
	});
}

export function useStocksQuery(searchQuery: string, sortOption: StockSortOption = 'name-asc') {
	return useGetAllStocksCodes({
		query: {
			refetchInterval: QUERY_REFETCH_INTERVAL,
			select: (data): Stock[] => {
				const mappedStocks = data.data.map(mapTradeCodeToStock);
				return getFilteredStocks({ stocks: mappedStocks, searchQuery, sortOption });
			},
		},
	});
}
