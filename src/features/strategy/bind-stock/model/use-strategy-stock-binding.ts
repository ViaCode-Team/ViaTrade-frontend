import { useMemo } from 'react';

import { mapTradeCodeToStock } from '@/entities/stock';
import { useGetStockCodesSuspense } from '@/entities/trade-code';

export const ITEMS_PER_PAGE = 12;

export function useStrategyStockBindingData(page = 1) {
	const { data: stocksResponse } = useGetStockCodesSuspense({ page, pageSize: ITEMS_PER_PAGE, sortBy: ['nameAsc'] });
	const stocks = useMemo(() => stocksResponse.data.items.map(mapTradeCodeToStock), [stocksResponse.data.items]);

	return {
		stocks,
		totalPages: stocksResponse.data.totalPages,
		totalCount: stocksResponse.data.totalCount,
	};
}
