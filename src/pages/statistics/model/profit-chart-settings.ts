import dayjs from 'dayjs';

import type { ProfitChartBucketResponse, TradeDateRangeResponse } from '@/shared/api';

import { DATE_DISPLAY_FORMAT } from '@/shared/model';

export type ProfitChartGranularity = 'day' | 'week' | 'month';

export type ProfitChartSettings = {
	startDate: string;
	endDate: string;
	granularity: ProfitChartGranularity;
};

export type ProfitChartPoint = {
	date: string;
	Сумма: number;
};

export const PROFIT_CHART_GRANULARITY_OPTIONS = [
	{ value: 'day', label: 'День' },
	{ value: 'week', label: 'Неделя' },
	{ value: 'month', label: 'Месяц' },
] as const;

function getProfitChartLabel(date: string, granularity: ProfitChartGranularity) {
	const pointDate = dayjs(date);

	if (granularity === 'week') {
		return `${pointDate.format('DD.MM')} - ${pointDate.endOf('week').format('DD.MM')}`;
	}

	if (granularity === 'month') {
		return pointDate.format('MM.YYYY');
	}

	return pointDate.format(DATE_DISPLAY_FORMAT);
}

export function normalizeProfitChartSettings(
	settings: ProfitChartSettings,
	dateRange?: TradeDateRangeResponse,
): ProfitChartSettings {
	const minDate = dateRange?.minDate;
	const maxDate = dateRange?.maxDate;

	if (!minDate || !maxDate)
		return settings;

	const startDate = clampDate(settings.startDate, minDate, maxDate);
	const endDate = clampDate(settings.endDate, minDate, maxDate);

	return {
		...settings,
		startDate: dayjs(startDate).isAfter(endDate, 'day') ? endDate : startDate,
		endDate,
	};
}

export function getInitialProfitChartSettings(dateRange?: TradeDateRangeResponse): ProfitChartSettings {
	return {
		startDate: dateRange?.minDate ?? '',
		endDate: dateRange?.maxDate ?? '',
		granularity: 'day',
	};
}

export function getProfitChartData(
	buckets: ProfitChartBucketResponse[],
	granularity: ProfitChartGranularity,
): ProfitChartPoint[] {
	let cumulativePnL = 0;

	return buckets.map((bucket) => {
		cumulativePnL += bucket.netIncome;

		return {
			date: getProfitChartLabel(bucket.date, granularity),
			Сумма: Number(cumulativePnL.toFixed(2)),
		};
	});
}

function clampDate(value: string, minDate: string, maxDate: string) {
	if (dayjs(value).isBefore(minDate, 'day'))
		return minDate;
	if (dayjs(value).isAfter(maxDate, 'day'))
		return maxDate;
	return value;
}
