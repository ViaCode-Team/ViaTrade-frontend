import type {
	IncomeTradeStatisticResponse,
	ProfitChartBucketResponse,
	TradeStatisticResponse,
} from '@/shared/api';

export type WinLossChartPoint = {
	name: string;
	value: number;
	color: string;
};

export type IncomeChartPoint = {
	metric: string;
	value: number;
};

export type DirectionPerformanceChartPoint = {
	direction: string;
	Сумма: number;
};

export function getWinLossChartData(tradeStatistic: TradeStatisticResponse): WinLossChartPoint[] {
	return [
		{ name: 'Прибыльные', value: tradeStatistic.winTrades, color: 'teal.6' },
		{ name: 'Убыточные', value: tradeStatistic.loseTrades, color: 'red.6' },
	];
}

export function getIncomeChartData(incomeStatistic: IncomeTradeStatisticResponse): IncomeChartPoint[] {
	return [
		{ metric: 'Общая прибыль', value: incomeStatistic.totalIncome },
		{ metric: 'Средняя прибыль', value: incomeStatistic.averageIncome },
	];
}

export function getDirectionPerformanceChartData(buckets: ProfitChartBucketResponse[]): DirectionPerformanceChartPoint[] {
	const performance = {
		Long: 0,
		Short: 0,
	};

	for (const bucket of buckets) {
		performance.Long += bucket.buyNetIncome;
		performance.Short += bucket.sellNetIncome;
	}

	return [
		{ direction: 'Long', Сумма: Number(performance.Long.toFixed(2)) },
		{ direction: 'Short', Сумма: Number(performance.Short.toFixed(2)) },
	];
}

export function formatChartCurrency(value: number) {
	return `${value.toFixed(2)} ₽`;
}

export function formatProfitChartPercentage(value: number) {
	return `${value.toFixed(2)} %`;
}

export function formatProfitFactor(value: number) {
	return Number.isFinite(value) ? value.toFixed(2) : '∞';
}
