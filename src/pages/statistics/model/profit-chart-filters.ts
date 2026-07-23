import dayjs from 'dayjs';

import type { TradeResponse } from '@/shared/api';

import { v } from '@/shared/lib/validation';

import type {
	ProfitChartGranularity,
	ProfitChartSettings,
} from './profit-chart-settings';

import {
	getInitialProfitChartSettings,
	normalizeProfitChartSettings,
} from './profit-chart-settings';

export const profitChartFiltersSchema = v.object({
	startDateFilter: v.fallback(v.string(), ''),
	endDateFilter: v.fallback(v.string(), ''),
	granularityFilter: v.fallback(
		v.picklist(['day', 'week', 'month']),
		'day',
	),
});

export type ProfitChartFilters = v.InferOutput<typeof profitChartFiltersSchema>;

const DATE_FILTER_PATTERN = /^\d{4}-\d{2}-\d{2}$/;

function isDateFilter(value: string) {
	return DATE_FILTER_PATTERN.test(value)
		&& dayjs(value).isValid()
		&& dayjs(value).format('YYYY-MM-DD') === value;
}

function getDateFilterValue(value: string, fallback: string) {
	return isDateFilter(value) ? value : fallback;
}

export function getProfitChartSettingsFromFilters(
	filters: ProfitChartFilters,
	trades: TradeResponse[],
	maxEndDate: string,
): ProfitChartSettings {
	const initialSettings = getInitialProfitChartSettings(trades);

	return normalizeProfitChartSettings(
		{
			startDate: getDateFilterValue(filters.startDateFilter, initialSettings.startDate),
			endDate: getDateFilterValue(filters.endDateFilter, initialSettings.endDate),
			granularity: filters.granularityFilter as ProfitChartGranularity,
		},
		maxEndDate,
	);
}

export function getProfitChartFiltersFromSettings(
	settings: ProfitChartSettings,
): Partial<ProfitChartFilters> {
	return {
		startDateFilter: settings.startDate,
		endDateFilter: settings.endDate,
		granularityFilter: settings.granularity,
	};
}
