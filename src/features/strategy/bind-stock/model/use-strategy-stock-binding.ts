import { useMemo } from 'react';

import { useGetAllStocksCodes, useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock } from '@/entities/trade-code/stock';

export const ITEMS_PER_PAGE = 12;

export function useStrategyStockBindingData() {
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();
	const stocks = useMemo(() => stocksResponse.data.map(mapTradeCodeToStock), [stocksResponse.data]);

	return {
		stocks,
	};
}

export function useStrategyStockBindingDataQuery() {
	const { data: stocksResponse, isLoading } = useGetAllStocksCodes();
	const stocks = useMemo(() => stocksResponse?.data.map(mapTradeCodeToStock) ?? [], [stocksResponse?.data]);

	return {
		stocks,
		isLoading,
	};
}
