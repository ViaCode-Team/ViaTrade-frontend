import { useMemo } from 'react';

import { mapTradeCodeToStock } from '@/entities/stock';
import { useGetAllStocksCodes, useGetAllStocksCodesSuspense } from '@/entities/trade-code';

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
