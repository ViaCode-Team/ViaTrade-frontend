export type ProfitChartGranularity = 'day' | 'week' | 'month';

export type ProfitChartSettings = {
	startDate: string;
	endDate: string;
	granularity: ProfitChartGranularity;
};

export const PROFIT_CHART_GRANULARITY_OPTIONS = [
	{ value: 'day', label: 'День' },
	{ value: 'week', label: 'Неделя' },
	{ value: 'month', label: 'Месяц' },
] as const;
