import { useMemo } from 'react';

import type { TradeResponse, TradeSignal } from '@/shared/api';

import { normalizeTradePage, useGetUserTradesSuspense } from '@/entities/trade';
import { useGetStockCodes } from '@/entities/trade-code';

import { type TradeFilters, useTradesHistory } from '../filter-trades';
import { processTrades } from './process-trades';

export type ProcessedTrade = TradeResponse & {
	ticker: string;
	isLong: boolean;
	income: number;
	percent?: number;
};

export function useTradesHistoryTable() {
	const {
		q,
		typeFilter,
		statusFilter,
		fieldSort,
		directionSort,
		page,
		setFilters,
		setFilter,
	} = useTradesHistory();

	const tradeParams = {
		page,
		pageSize: 10,
		status: statusFilter === 'all' ? undefined : statusFilter,
		signal: (typeFilter === 'all' ? undefined : typeFilter === 'long' ? 1 : -1) as TradeSignal | undefined,
	};

	const { data: tradesResponse } = useGetUserTradesSuspense({ ...tradeParams });
	const tradesPage = normalizeTradePage(tradesResponse.data);

	const { data: stocksResponse } = useGetStockCodes({
		page: 1,
		pageSize: 100,
	});

	const trades = tradesPage.items;
	const stocks = getList<{ id: number; exchangeId: string }>(stocksResponse?.data);

	const processedTrades = useMemo(
		() => processTrades(trades, stocks, { q, fieldSort, directionSort }),
		[trades, stocks, q, fieldSort, directionSort],
	);

	const setSorting = (field: TradeFilters['fieldSort']) => {
		const reversed = field === fieldSort ? directionSort === 'desc' : false;

		setFilters({
			directionSort: reversed ? 'asc' : 'desc',
			fieldSort: field,
			page: '1',
		});
	};

	const setPage = (val: number) => {
		setFilter('page', val.toString());
	};

	return {
		trades,
		paginatedTrades: processedTrades,
		totalPages: tradesPage.totalPages,
		fieldSort,
		directionSort,
		page,
		setSorting,
		setPage,
	};
}

function getList<T>(value: unknown): T[] {
	if (Array.isArray(value))
		return value as T[];
	if (typeof value === 'object' && value !== null && 'items' in value && Array.isArray(value.items))
		return value.items as T[];
	return [];
}
