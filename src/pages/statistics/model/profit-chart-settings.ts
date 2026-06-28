import dayjs from 'dayjs';

import type { Trade } from '@/shared/api';

import type { ProfitChartGranularity, ProfitChartSettings } from './statistics-dashboard-types';

const DATE_FORMAT = 'YYYY-MM-DD';

function addGranularity(date: string, granularity: ProfitChartGranularity) {
	return dayjs(date).add(1, granularity);
}

function subtractGranularity(date: string, granularity: ProfitChartGranularity) {
	return dayjs(date).subtract(1, granularity);
}

function getTradeChartDate(trade: Trade) {
	return dayjs(trade.dateClose ?? trade.dateOpen).startOf('day');
}

export function formatProfitChartDate(date: dayjs.ConfigType) {
	return dayjs(date).format(DATE_FORMAT);
}

export function getMinProfitChartEndDate(
	startDate: string,
	granularity: ProfitChartGranularity,
) {
	return formatProfitChartDate(addGranularity(startDate, granularity));
}

export function getMaxProfitChartStartDate(
	endDate: string,
	granularity: ProfitChartGranularity,
) {
	return formatProfitChartDate(subtractGranularity(endDate, granularity));
}

export function normalizeProfitChartSettings(
	settings: ProfitChartSettings,
	maxEndDate: string,
): ProfitChartSettings {
	const endDate = dayjs(settings.endDate).isAfter(maxEndDate, 'day')
		? maxEndDate
		: settings.endDate;
	const maxStartDate = getMaxProfitChartStartDate(endDate, settings.granularity);
	const startDate = dayjs(settings.startDate).isAfter(maxStartDate, 'day')
		? maxStartDate
		: settings.startDate;

	return {
		...settings,
		startDate,
		endDate,
	};
}

export function getInitialProfitChartSettings(trades: Trade[]): ProfitChartSettings {
	const tradeDates = trades.map(getTradeChartDate);
	const fallbackEndDate = dayjs().startOf('day');
	const lastTradeDate = tradeDates.length > 0
		? tradeDates.reduce((latest, date) => (date.isAfter(latest) ? date : latest))
		: fallbackEndDate;
	const firstTradeDate = tradeDates.length > 0
		? tradeDates.reduce((earliest, date) => (date.isBefore(earliest) ? date : earliest))
		: lastTradeDate.subtract(1, 'day');
	const endDate = formatProfitChartDate(lastTradeDate);
	const maxStartDate = getMaxProfitChartStartDate(endDate, 'day');
	const startDate = firstTradeDate.isAfter(maxStartDate)
		? maxStartDate
		: formatProfitChartDate(firstTradeDate);

	return {
		startDate,
		endDate,
		granularity: 'day',
	};
}
