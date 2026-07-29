import type {
	IncomeTradeStatistic,
	TradeResponse,
	TradeStatistic,
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

export function getWinLossChartData(tradeStatistic: TradeStatistic): WinLossChartPoint[] {
	return [
		{ name: 'Прибыльные', value: tradeStatistic.winTrades, color: 'teal.6' },
		{ name: 'Убыточные', value: tradeStatistic.loseTrades, color: 'red.6' },
	];
}

export function getIncomeChartData(incomeStatistic: IncomeTradeStatistic): IncomeChartPoint[] {
	return [
		{ metric: 'Общая прибыль', value: incomeStatistic.totalIncome },
		{ metric: 'Средняя прибыль', value: incomeStatistic.averageIncome },
	];
}

export function getDirectionPerformanceChartData(trades: TradeResponse[]): DirectionPerformanceChartPoint[] {
	const performance = {
		Long: 0,
		Short: 0,
	};

	for (const trade of trades) {
		const direction = trade.signal === -1 ? 'Short' : 'Long';
		performance[direction] += trade.netIncome ?? 0;
	}

	return [
		{ direction: 'Long', Сумма: Number(performance.Long.toFixed(2)) },
		{ direction: 'Short', Сумма: Number(performance.Short.toFixed(2)) },
	];
}

export function formatChartCurrency(value: number) {
	return `${value.toFixed(2)} ₽`;
}

export function formatProfitFactor(value: number) {
	return Number.isFinite(value) ? value.toFixed(2) : '∞';
}
