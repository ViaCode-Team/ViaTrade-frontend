import {
	useGetInstruments,
	useGetInstrumentsSuspense,
} from '@/entities/instrument';
import { mapInstrumentToStock, type StockSortOption } from '@/entities/stock';

export const STOCKS_PAGE_SIZE = 12;

const sortBy = {
	'name-asc': 'symbolAsc',
	'name-desc': 'symbolDesc',
} as const;

function getStocksParams(searchQuery: string, page: number, sortOption: StockSortOption) {
	return {
		page,
		pageSize: STOCKS_PAGE_SIZE,
		searchText: searchQuery.trim() || undefined,
		sortBy: [sortBy[sortOption]],
	};
}

export function useStocksQuerySuspense(searchQuery: string, sortOption: StockSortOption = 'name-asc', page = 1) {
	return useGetInstrumentsSuspense(getStocksParams(searchQuery, page, sortOption), {
		query: {
			select: (data) => ({
				...data,
				data: {
					...data.data,
					items: data.data.items.map(mapInstrumentToStock),
				},
			}),
		},
	});
}

export function useStocksQuery(searchQuery: string, sortOption: StockSortOption = 'name-asc', page = 1) {
	return useGetInstruments(getStocksParams(searchQuery, page, sortOption), {
		query: {
			select: (data) => ({
				...data,
				data: {
					...data.data,
					items: data.data.items.map(mapInstrumentToStock),
				},
			}),
		},
	});
}
