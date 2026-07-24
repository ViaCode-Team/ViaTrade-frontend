import dayjs from 'dayjs';
import { useMemo } from 'react';

import type { TradeResponse, TradeSignal } from '@/shared/api';

import { normalizeTradePage, useGetUserTradesSuspense } from '@/entities/trade';
import { useGetStockCodes } from '@/entities/trade-code';
import { DATE_TIME_DISPLAY_FORMAT } from '@/shared/model';

import { type TradeFilters, useTradesHistory } from '../filter-trades';

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

	const { data: tradesResponse } = useGetUserTradesSuspense({
		...tradeParams,
	});
	const tradesPage = normalizeTradePage(tradesResponse.data);
	const { data: stocksResponse } = useGetStockCodes({
		page: 1,
		pageSize: 100,
	});
	const trades = tradesPage.items;
	const stocks = getList<{ id: number; exchangeId: string }>(stocksResponse?.data);

	const processedTrades = useMemo(() => {
		let result = trades.map((trade) => {
			const normalizedTrade = {
				...trade,
				tradeOpen: toNumber(trade.tradeOpen),
				tradeClose: toOptionalNumber(trade.tradeClose),
				price: toNumber(trade.price),
				netIncome: toOptionalNumber(trade.netIncome),
			};
			const stock = stocks.find((s) => s.id === trade.tradeCodeId);
			return {
				...normalizedTrade,
				ticker: stock?.exchangeId ?? `Инструмент #${trade.tradeCodeId}`,
				isLong: trade.tradeSignal !== -1,
				income: normalizedTrade.price,
				percent: normalizedTrade.netIncome,
			};
		});

		if (q) {
			const lowerSearch = q.toLowerCase();
			result = result.filter((t) => {
				const dateOpenStr = dayjs(t.dateOpen).format(DATE_TIME_DISPLAY_FORMAT);
				const dateCloseStr = t.dateClose ? dayjs(t.dateClose).format(DATE_TIME_DISPLAY_FORMAT) : '—';
				const tradeOpenStr = `${t.tradeOpen.toFixed(2)} ₽`;
				const tradeCloseStr = t.tradeClose ? `${t.tradeClose.toFixed(2)} ₽` : '—';
				const sumStr = t.income > 0 ? `+${t.income.toFixed(2)} ₽` : `${t.income.toFixed(2)} ₽`;
				const percentStr = t.percent ? (t.percent > 0 ? `+${t.percent.toFixed(2)}%` : `${t.percent.toFixed(2)}%`) : '—';
				const typeStr = t.isLong ? 'Long' : 'Short';

				const searchableString = [
					t.ticker,
					typeStr,
					dateOpenStr,
					dateCloseStr,
					tradeOpenStr,
					tradeCloseStr,
					String(t.count),
					sumStr,
					percentStr,
				].join(' ').toLowerCase();

				return searchableString.includes(lowerSearch);
			});
		}
		result.sort((a, b) => {
			let aVal: string | number;
			let bVal: string | number;

			switch (fieldSort) {
				case 'ticker':
					aVal = a.ticker;
					bVal = b.ticker;
					break;
				case 'type':
					aVal = a.isLong ? 1 : 0;
					bVal = b.isLong ? 1 : 0;
					break;
				case 'dateOpen':
					aVal = dayjs(a.dateOpen).valueOf();
					bVal = dayjs(b.dateOpen).valueOf();
					break;
				case 'dateClose':
					aVal = a.dateClose ? dayjs(a.dateClose).valueOf() : 0;
					bVal = b.dateClose ? dayjs(b.dateClose).valueOf() : 0;
					break;
				case 'tradeOpen':
					aVal = a.tradeOpen;
					bVal = b.tradeOpen;
					break;
				case 'tradeClose':
					aVal = a.tradeClose || 0;
					bVal = b.tradeClose || 0;
					break;
				case 'count':
					aVal = a.count;
					bVal = b.count;
					break;
				case 'sum':
					aVal = a.income;
					bVal = b.income;
					break;
				case 'income':
					aVal = a.percent ?? 0;
					bVal = b.percent ?? 0;
					break;
				default:
					aVal = dayjs(a.dateOpen).valueOf();
					bVal = dayjs(b.dateOpen).valueOf();
			}

			if (aVal === bVal)
				return 0;
			const compare = aVal > bVal ? 1 : -1;
			return directionSort === 'desc' ? -compare : compare;
		});

		return result;
	}, [trades, stocks, q, fieldSort, directionSort]);

	const totalPages = tradesPage.totalPages;
	const paginatedTrades = processedTrades;

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
		paginatedTrades,
		totalPages,
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

function toNumber(value: number | null | undefined): number {
	return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function toOptionalNumber(value: number | null | undefined): number | undefined {
	return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}
