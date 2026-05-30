import dayjs from 'dayjs';
import { useMemo } from 'react';

import type { SortDirection, SortField } from '@/features/trade/filter-trades';
import type { Trade } from '@/shared/api/types/gen/trade';

import { useGetByUserSuspense } from '@/entities/statistic/api/gen';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';

export type UseTradesHistoryDataProps = {
	search: string;
	typeFilter: 'all' | 'long' | 'short';
	statusFilter: 'all' | 'open' | 'closed';
	sortField: SortField;
	sortDirection: SortDirection;
	page: number;
};

export type ProcessedTrade = Trade & {
	ticker: string;
	isLong: boolean;
	income: number;
	percent: number;
};

export function useTradesHistoryData({
	search,
	typeFilter,
	statusFilter,
	sortField,
	sortDirection,
	page,
}: UseTradesHistoryDataProps) {
	const { data: tradesResponse } = useGetByUserSuspense();
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();

	const trades = tradesResponse.data;
	const stocks = stocksResponse.data;

	const processedTrades = useMemo(() => {
		let result = trades.map((trade) => {
			const stock = stocks.find((s) => s.id === trade.tradeCodeId);
			return {
				...trade,
				ticker: stock?.exchangeId || '-',
				isLong: trade.tradeSignal !== -1,
				income: trade.price ?? 0,
				percent: trade.netIncome ?? 0,
			};
		});

		if (search) {
			const lowerSearch = search.toLowerCase();
			result = result.filter((t) => {
				const dateOpenStr = dayjs(t.dateOpen).format('DD.MM.YYYY HH:mm');
				const dateCloseStr = t.dateClose ? dayjs(t.dateClose).format('DD.MM.YYYY HH:mm') : '—';
				const tradeOpenStr = `${t.tradeOpen.toFixed(2)} ₽`;
				const tradeCloseStr = t.tradeClose ? `${t.tradeClose.toFixed(2)} ₽` : '—';
				const sumStr = t.income > 0 ? `+${t.income.toFixed(2)} ₽` : `${t.income.toFixed(2)} ₽`;
				const percentStr = t.percent > 0 ? `+${t.percent.toFixed(2)}%` : `${t.percent.toFixed(2)}%`;
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

			switch (sortField) {
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
				case 'percent':
					aVal = a.percent;
					bVal = b.percent;
					break;
				default:
					aVal = dayjs(a.dateOpen).valueOf();
					bVal = dayjs(b.dateOpen).valueOf();
			}

			if (aVal === bVal)
				return 0;
			const compare = aVal > bVal ? 1 : -1;
			return sortDirection === 'desc' ? -compare : compare;
		});

		return result;
	}, [trades, stocks, search, typeFilter, statusFilter, sortField, sortDirection]);

	const totalPages = Math.ceil(processedTrades.length / 10);
	const paginatedTrades = processedTrades.slice((page - 1) * 10, page * 10);

	return {
		trades,
		paginatedTrades,
		totalPages,
	};
}
