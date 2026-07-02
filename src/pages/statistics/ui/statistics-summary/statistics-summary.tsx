import { TRADE_STATISTICS_CARDS, useGetTradeStatisticsSuspense } from '@/entities/trade';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { StatisticsSummarySkeleton } from './statistics-summary.skeleton';

export function StatisticsSummary() {
	const { data: response } = useGetTradeStatisticsSuspense();
	const {
		incomeStatistic,
		tradeStatistic,
		winrateStatistic,
	} = response.data;

	return (
		<SummaryList>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.totalTrades.title}
				value={tradeStatistic.totalTrades}
				description={`Прибыльных: ${tradeStatistic.winTrades} | Убыточных: ${tradeStatistic.loseTrades}`}
			/>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.totalIncome.title}
				value={`${incomeStatistic.totalIncome.toFixed(2)} ₽`}
				description={`Средняя: ${incomeStatistic.averageIncome.toFixed(2)} ₽`}
				color={TRADE_STATISTICS_CARDS.totalIncome.getColor(incomeStatistic.totalIncome)}
			/>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.winRate.title}
				value={`${winrateStatistic.totalWinrate.toFixed(1)}%`}
				description={`Profit Factor: ${winrateStatistic.profitFactor === Infinity ? '∞' : winrateStatistic.profitFactor.toFixed(2)}`}
				color={TRADE_STATISTICS_CARDS.winRate.getColor(winrateStatistic.totalWinrate)}
			/>
		</SummaryList>
	);
}

export const StatisticsSummaryBoundary = withQueryBoundary(StatisticsSummary, {
	suspenseProps: {
		fallback: <StatisticsSummarySkeleton />,
	},
});
