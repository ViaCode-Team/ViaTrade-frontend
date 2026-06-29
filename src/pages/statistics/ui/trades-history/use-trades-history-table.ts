import { useIsFetching } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';

import type { Trade } from '@/shared/api';

import { getGetByUserQueryKey, useGetByUserSuspense } from '@/entities/statistic';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code';
import { type TradeFilters, useTradesHistory } from '@/pages/statistics/ui/filter-trades';
import { DATE_TIME_DISPLAY_FORMAT } from '@/shared/model';

export type ProcessedTrade = Trade & {
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

	const { data: tradesResponse } = useGetByUserSuspense();
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();
	const isFetchingTrades = useIsFetching({ queryKey: getGetByUserQueryKey() });

	const trades = tradesResponse.data;
	const stocks = stocksResponse.data;

	const processedTrades = useMemo(() => {
		let result = trades.map((trade) => {
			const stock = stocks.find((s) => s.id === trade.tradeCodeId);
			return {
				...trade,
				ticker: stock?.exchangeId || '-',
				isLong: trade.tradeSignal !== -1,
				income: trade.price,
				percent: trade.netIncome,
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
		if (typeFilter !== 'all') {
			result = result.filter((t) => (typeFilter === 'long' ? t.isLong : !t.isLong));
		}
		if (statusFilter !== 'all') {
			result = result.filter((t) => (statusFilter === 'open' ? !t.dateClose : !!t.dateClose));
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
	}, [trades, stocks, q, typeFilter, statusFilter, fieldSort, directionSort]);

	const totalPages = Math.ceil(processedTrades.length / 10);
	const paginatedTrades = processedTrades.slice((page - 1) * 10, page * 10);

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
		isFetching: isFetchingTrades > 0,
		setSorting,
		setPage,
	};
}
