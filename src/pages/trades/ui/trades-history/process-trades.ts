import dayjs from 'dayjs';

import type { TradeResponse } from '@/shared/api';

import { DATE_TIME_DISPLAY_FORMAT } from '@/shared/model';

import type { TradeFilters } from '../filter-trades';
import type { ProcessedTrade } from './use-trades-history-table';

export function processTrades(
	trades: TradeResponse[],
	stocks: { id: number; exchangeId: string }[],
	filters: Pick<TradeFilters, 'q' | 'fieldSort' | 'directionSort'>,
): ProcessedTrade[] {
	const { q, fieldSort, directionSort } = filters;

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
}

function toNumber(value: number | null | undefined): number {
	return typeof value === 'number' && Number.isFinite(value) ? value : 0;
}

function toOptionalNumber(value: number | null | undefined): number | undefined {
	return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}
