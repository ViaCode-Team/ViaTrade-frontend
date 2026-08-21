import {
	useGetInstruments,
	useGetInstrumentsSuspense,
} from '@/entities/instrument';
import { getFilteredStocks, mapInstrumentToStock, type StockSortOption } from '@/entities/stock';

export const STOCKS_PAGE_SIZE = 12;

const sortBy = {
	'name-asc': 'symbolAsc',
	'name-desc': 'symbolDesc',
} as const;

function getStocksParams(page: number, sortOption: StockSortOption) {
	return { page, pageSize: STOCKS_PAGE_SIZE, sortBy: [sortBy[sortOption]] };
}

export function useStocksQuerySuspense(searchQuery: string, sortOption: StockSortOption = 'name-asc', page = 1) {
	return useGetInstrumentsSuspense(getStocksParams(page, sortOption), {
		query: {
			select: (data) => ({
				...data,
				data: {
					...data.data,
					items: getFilteredStocks({ stocks: data.data.items.map(mapInstrumentToStock), searchQuery }),
				},
			}),
		},
	});
}

export function useStocksQuery(searchQuery: string, sortOption: StockSortOption = 'name-asc', page = 1) {
	return useGetInstruments(getStocksParams(page, sortOption), {
		query: {
			select: (data) => ({
				...data,
				data: {
					...data.data,
					items: getFilteredStocks({ stocks: data.data.items.map(mapInstrumentToStock), searchQuery }),
				},
			}),
		},
	});
}
