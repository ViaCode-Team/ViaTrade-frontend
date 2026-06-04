import {
	useGetAllStocksCodes,
	useGetAllStocksCodesSuspense,
} from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock, type Stock } from '@/entities/trade-code/stock';
import { getFilteredStocks, type StockSortOption } from '@/features/stock/filter-stocks';

export function useStocksQuerySuspense(searchQuery: string, sortOption: StockSortOption = 'name-asc') {
	return useGetAllStocksCodesSuspense({
		query: {
			refetchInterval: 300000,
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
			refetchInterval: 300000,
			select: (data): Stock[] => {
				const mappedStocks = data.data.map(mapTradeCodeToStock);
				return getFilteredStocks({ stocks: mappedStocks, searchQuery, sortOption });
			},
		},
	});
}
