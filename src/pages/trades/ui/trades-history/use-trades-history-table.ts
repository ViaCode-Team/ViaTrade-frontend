import { useMemo } from 'react';

import type { TradeResponse, TradeSignal } from '@/shared/api';

import { normalizeTradePage, useGetTradesSuspense } from '@/entities/trade';

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

	const { data: tradesResponse } = useGetTradesSuspense({ ...tradeParams });
	const tradesPage = normalizeTradePage(tradesResponse.data);

	const trades = tradesPage.items;

	const processedTrades = useMemo(
		() => processTrades(trades, { q, fieldSort, directionSort }),
		[trades, q, fieldSort, directionSort],
	);

	const setSorting = (field: TradeFilters['fieldSort']) => {
		const reversed = field === fieldSort && directionSort === 'desc';

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
