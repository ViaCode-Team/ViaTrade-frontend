import dayjs from 'dayjs';

import type { Trade } from '@/shared/api';

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

function getProfitChartPointDate(date: string, granularity: ProfitChartGranularity) {
	const tradeDate = dayjs(date);

	if (granularity === 'week') {
		return tradeDate.startOf('week');
	}

	if (granularity === 'month') {
		return tradeDate.startOf('month');
	}

	return tradeDate.startOf('day');
}

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

export function getProfitChartDateRangeParams(settings: ProfitChartSettings) {
	return {
		startDate: dayjs(settings.startDate).startOf('day').toISOString(),
		endDate: dayjs(settings.endDate).endOf('day').toISOString(),
	};
}

export function getProfitChartData(
	trades: Trade[],
	granularity: ProfitChartGranularity,
): ProfitChartPoint[] {
	const pnlByDate = new Map<string, number>();

	for (const trade of trades) {
		const tradeDate = dayjs(trade.dateClose ?? trade.dateOpen);
		const pointDate = getProfitChartPointDate(
			tradeDate.toISOString(),
			granularity,
		);
		const pointKey = pointDate.format(DATE_FORMAT);
		pnlByDate.set(pointKey, (pnlByDate.get(pointKey) ?? 0) + (trade.netIncome ?? 0));
	}

	const sortedEntries = [...pnlByDate.entries()].sort(
		(a, b) =>
			dayjs(a[0]).valueOf()
			- dayjs(b[0]).valueOf(),
	);

	let cumulativePnL = 0;

	return sortedEntries.map(([date, income]) => {
		cumulativePnL += income;

		return {
			date: getProfitChartLabel(date, granularity),
			Сумма: Number(cumulativePnL.toFixed(2)),
		};
	});
}
