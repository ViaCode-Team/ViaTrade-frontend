import type { GlobalStatistic } from '@/shared/api';

import { TRADE_STATISTICS_CARDS } from '@/entities/trade';

import { formatChartCurrency, formatProfitFactor } from './statistics-dashboard';

export type StatisticsSummaryCardData = {
	id: string;
	title: string;
	value: string | number;
	description: string;
	color?: string;
};

export function getStatisticsSummaryCardsData(statistic: GlobalStatistic): StatisticsSummaryCardData[] {
	const {
		incomeStatistic,
		tradeStatistic,
		winrateStatistic,
	} = statistic;

	return [
		{
			id: 'totalTrades',
			title: TRADE_STATISTICS_CARDS.totalTrades.title,
			value: tradeStatistic.totalTrades,
			description: `Прибыльных: ${tradeStatistic.winTrades} | Убыточных: ${tradeStatistic.loseTrades}`,
		},
		{
			id: 'totalIncome',
			title: TRADE_STATISTICS_CARDS.totalIncome.title,
			value: formatChartCurrency(incomeStatistic.totalIncome),
			description: `Средняя: ${formatChartCurrency(incomeStatistic.averageIncome)}`,
			color: TRADE_STATISTICS_CARDS.totalIncome.getColor(incomeStatistic.totalIncome),
		},
		{
			id: 'winRate',
			title: TRADE_STATISTICS_CARDS.winRate.title,
			value: `${winrateStatistic.totalWinrate.toFixed(1)}%`,
			description: `Profit Factor: ${formatProfitFactor(winrateStatistic.profitFactor)}`,
			color: TRADE_STATISTICS_CARDS.winRate.getColor(winrateStatistic.totalWinrate),
		},
	];
}
