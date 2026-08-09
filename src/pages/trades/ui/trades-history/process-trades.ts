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
			openPrice: toNumber(trade.openPrice),
			closePrice: toOptionalNumber(trade.closePrice),
			totalPrice: toNumber(trade.totalPrice),
			netIncome: toOptionalNumber(trade.netIncome),
		};
		return {
			...normalizedTrade,
			ticker: trade.instrument?.symbol ?? 'Неизвестный инструмент',
			isLong: trade.signal !== -1,
		};
	});

	if (q) {
		const lowerSearch = q.toLowerCase();
		result = result.filter((t) => {
			const openedAtStr = dayjs(t.openedAt).format(DATE_TIME_DISPLAY_FORMAT);
			const closedAtStr = t.closedAt ? dayjs(t.closedAt).format(DATE_TIME_DISPLAY_FORMAT) : '—';
			const openPriceStr = `${t.openPrice.toFixed(2)} ₽`;
			const closePriceStr = t.closePrice !== undefined ? `${t.closePrice.toFixed(2)} ₽` : '—';
			const totalPriceStr = `${t.totalPrice.toFixed(2)} ₽`;
			const netIncomeStr = t.netIncome !== undefined ? (t.netIncome > 0 ? `+${t.netIncome.toFixed(2)}` : t.netIncome.toFixed(2)) : '—';
			const typeStr = t.isLong ? 'Long' : 'Short';

			const searchableString = [
				t.ticker,
				typeStr,
				openedAtStr,
				closedAtStr,
				openPriceStr,
				closePriceStr,
				String(t.quantity),
				totalPriceStr,
				netIncomeStr,
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
			case 'openPrice':
				aVal = a.openPrice;
				bVal = b.openPrice;
				break;
			case 'closePrice':
				aVal = a.closePrice || 0;
				bVal = b.closePrice || 0;
				break;
			case 'quantity':
				aVal = a.quantity;
				bVal = b.quantity;
				break;
			case 'sum':
				aVal = a.totalPrice;
				bVal = b.totalPrice;
				break;
			case 'income':
				aVal = a.netIncome ?? 0;
				bVal = b.netIncome ?? 0;
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
