import { v } from '@/shared/model/validate';

export const tradeFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	typeFilter: v.fallback(
		v.picklist(['all', 'long', 'short']),
		'all',
	),
	statusFilter: v.fallback(
		v.picklist(['all', 'open', 'closed']),
		'all',
	),
	fieldSort: v.fallback(
		v.picklist([
			'ticker',
			'type',
			'dateOpen',
			'dateClose',
			'tradeOpen',
			'tradeClose',
			'count',
			'sum',
			'income',
		]),
		'dateOpen',
	),
	directionSort: v.fallback(
		v.picklist(['asc', 'desc']),
		'desc',
	),
	page: v.fallback(v.string(), '1'),
});

export type TradeFilters = v.InferOutput<typeof tradeFiltersSchema>;

export const defaultTradeFilters = v.parse(tradeFiltersSchema, {
	typeFilter: 'hacked',
});
