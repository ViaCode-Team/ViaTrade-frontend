import type { ReactNode } from 'react';

import type { GlobalStatisticResponse } from '@/shared/api';

import { TRADE_STATISTICS_CARDS } from '@/entities/trade';
import { TextTooltip } from '@/shared/ui/text-tooltip';

import { formatChartCurrency, formatProfitFactor } from './statistics';

export type StatisticsSummaryCardData = {
	id: string;
	title: ReactNode;
	value: string | number;
	description: ReactNode;
	color?: string;
};

export function getStatisticsSummaryCardsData(statistic: GlobalStatisticResponse): StatisticsSummaryCardData[] {
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
			description: (
				<>
					<TextTooltip label='Отношение суммы всей прибыли к сумме всех убытков. Если значение > 1, торговля прибыльна.'>
						Profit Factor
					</TextTooltip>
					:
					{' '}
					{formatProfitFactor(winrateStatistic.profitFactor)}
				</>
			),
			color: TRADE_STATISTICS_CARDS.winRate.getColor(winrateStatistic.totalWinrate),
		},
	];
}
