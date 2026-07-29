import { useMemo } from 'react';

import { useGetInstrumentsSuspense } from '@/entities/instrument';
import { mapInstrumentToStock } from '@/entities/stock';

export const ITEMS_PER_PAGE = 12;

export function useStrategyStockBindingData(page = 1) {
	const { data: stocksResponse } = useGetInstrumentsSuspense({ page, pageSize: ITEMS_PER_PAGE, sortBy: ['symbolAsc'] });
	const stocks = useMemo(() => stocksResponse.data.items.map(mapInstrumentToStock), [stocksResponse.data.items]);

	return {
		stocks,
		totalPages: stocksResponse.data.totalPages,
		totalCount: stocksResponse.data.totalCount,
	};
}
