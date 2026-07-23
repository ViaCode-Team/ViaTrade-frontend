import type { TradeResponse, TradeResponsePageResult } from '@/shared/api';

export function normalizeTradePage(value: unknown): TradeResponsePageResult {
	if (Array.isArray(value))
		return createTradePage(value as TradeResponse[]);

	if (isTradePage(value))
		return value;

	if (isObject(value) && isTradePage(value.data))
		return value.data;

	return createTradePage([]);
}

function createTradePage(items: TradeResponse[]): TradeResponsePageResult {
	return {
		items,
		totalCount: items.length,
		page: 1,
		pageSize: items.length || 1,
		totalPages: items.length ? 1 : 0,
	};
}

function isTradePage(value: unknown): value is TradeResponsePageResult {
	return isObject(value) && Array.isArray(value.items);
}

function isObject(value: unknown): value is Record<string, unknown> {
	return typeof value === 'object' && value !== null;
}
