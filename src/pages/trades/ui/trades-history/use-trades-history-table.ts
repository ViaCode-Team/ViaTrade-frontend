import { useMemo } from 'react';

import type { TradeResponse, TradeSignal } from '@/shared/api';

import { useGetTradesSuspense } from '@/entities/trade';

import { type TradeFilters, useTradesHistory } from '../filter-trades';
import { processTrades } from './process-trades';

export type ProcessedTrade = TradeResponse & {
	ticker: string;
	isLong: boolean;
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
		searchText: q.trim() || undefined,
		status: statusFilter === 'all' ? undefined : statusFilter,
		signal: (typeFilter === 'all' ? undefined : typeFilter === 'long' ? 1 : -1) as TradeSignal | undefined,
	};

	const { data: tradesResponse } = useGetTradesSuspense({ ...tradeParams });
	const tradesPage = tradesResponse.data;

	const trades = tradesPage.items;

	const processedTrades = useMemo(
		() => processTrades(trades, { fieldSort, directionSort }),
		[trades, fieldSort, directionSort],
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
		hasData: !!tradesPage.totalCount || Boolean(q.trim()) || typeFilter !== 'all' || statusFilter !== 'all',
		paginatedTrades: processedTrades,
		totalPages: tradesPage.totalPages,
		fieldSort,
		directionSort,
		page,
		setSorting,
		setPage,
	};
}
