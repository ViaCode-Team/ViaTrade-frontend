import { getFilteredStocks, mapTradeCodeToStock, type StockSortOption } from '@/entities/stock';
import {
	useGetStockCodes,
	useGetStockCodesSuspense,
} from '@/entities/trade-code';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

export const STOCKS_PAGE_SIZE = 12;

const sortBy = {
	'name-asc': 'nameAsc',
	'name-desc': 'nameDesc',
} as const;

function getStocksParams(page: number, sortOption: StockSortOption) {
	return { page, pageSize: STOCKS_PAGE_SIZE, sortBy: [sortBy[sortOption]] };
}

export function useStocksQuerySuspense(searchQuery: string, sortOption: StockSortOption = 'name-asc', page = 1) {
	return useGetStockCodesSuspense(getStocksParams(page, sortOption), {
		query: {
			refetchInterval: QUERY_REFETCH_INTERVAL,
			select: (data) => ({
				...data,
				data: {
					...data.data,
					items: getFilteredStocks({ stocks: data.data.items.map(mapTradeCodeToStock), searchQuery }),
				},
			}),
		},
	});
}

export function useStocksQuery(searchQuery: string, sortOption: StockSortOption = 'name-asc', page = 1) {
	return useGetStockCodes(getStocksParams(page, sortOption), {
		query: {
			refetchInterval: QUERY_REFETCH_INTERVAL,
			select: (data) => ({
				...data,
				data: {
					...data.data,
					items: getFilteredStocks({ stocks: data.data.items.map(mapTradeCodeToStock), searchQuery }),
				},
			}),
		},
	});
}
