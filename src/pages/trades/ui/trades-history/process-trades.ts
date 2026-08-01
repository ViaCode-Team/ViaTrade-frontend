import dayjs from 'dayjs';

import type { TradeResponse } from '@/shared/api';

import { DATE_TIME_DISPLAY_FORMAT } from '@/shared/model';

import type { TradeFilters } from '../filter-trades';
import type { ProcessedTrade } from './use-trades-history-table';

export function processTrades(
	trades: TradeResponse[],
	filters: Pick<TradeFilters, 'q' | 'fieldSort' | 'directionSort'>,
): ProcessedTrade[] {
	const { q, fieldSort, directionSort } = filters;

	let result = trades.map((trade) => {
		const normalizedTrade = {
			...trade,
			entryPrice: toNumber(trade.entryPrice),
			exitPrice: toOptionalNumber(trade.exitPrice),
			totalPrice: toNumber(trade.totalPrice),
			netIncome: toOptionalNumber(trade.netIncome),
		};
		return {
			...normalizedTrade,
			ticker: trade.instrument?.symbol ?? 'Неизвестный инструмент',
			isLong: trade.signal !== -1,
			income: normalizedTrade.netIncome ?? 0,
			percent: normalizedTrade.totalPrice
				? (normalizedTrade.netIncome ?? 0) / normalizedTrade.totalPrice * 100
				: undefined,
		};
	});

	if (q) {
		const lowerSearch = q.toLowerCase();
		result = result.filter((t) => {
			const openedAtStr = dayjs(t.openedAt).format(DATE_TIME_DISPLAY_FORMAT);
			const closedAtStr = t.closedAt ? dayjs(t.closedAt).format(DATE_TIME_DISPLAY_FORMAT) : '—';
			const entryPriceStr = `${t.entryPrice.toFixed(2)} ₽`;
			const exitPriceStr = t.exitPrice !== undefined ? `${t.exitPrice.toFixed(2)} ₽` : '—';
			const sumStr = t.income > 0 ? `+${t.income.toFixed(2)} ₽` : `${t.income.toFixed(2)} ₽`;
			const percentStr = t.percent !== undefined ? (t.percent > 0 ? `+${t.percent.toFixed(2)}%` : `${t.percent.toFixed(2)}%`) : '—';
			const typeStr = t.isLong ? 'Long' : 'Short';

			const searchableString = [
				t.ticker,
				typeStr,
				openedAtStr,
				closedAtStr,
				entryPriceStr,
				exitPriceStr,
				String(t.quantity),
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
			case 'openedAt':
				aVal = dayjs(a.openedAt).valueOf();
				bVal = dayjs(b.openedAt).valueOf();
				break;
			case 'closedAt':
				aVal = a.closedAt ? dayjs(a.closedAt).valueOf() : 0;
				bVal = b.closedAt ? dayjs(b.closedAt).valueOf() : 0;
				break;
			case 'entryPrice':
				aVal = a.entryPrice;
				bVal = b.entryPrice;
				break;
			case 'exitPrice':
				aVal = a.exitPrice || 0;
				bVal = b.exitPrice || 0;
				break;
			case 'quantity':
				aVal = a.quantity;
				bVal = b.quantity;
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
				aVal = dayjs(a.openedAt).valueOf();
				bVal = dayjs(b.openedAt).valueOf();
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
