import { TRADE_STATISTICS_CARDS } from '@/entities/statistic';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { StatisticsSummarySkeleton } from './statistics-summary.skeleton';
import { useStatisticsSummary } from './use-statistics-summary';

export function StatisticsSummary() {
	const stats = useStatisticsSummary();

	return (
		<SummaryList>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.totalTrades.title}
				value={stats.totalTrades}
				description={`Прибыльных: ${stats.profitableTrades} | Убыточных: ${stats.losingTrades}`}
			/>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.totalIncome.title}
				value={`${stats.totalIncome.toFixed(2)} ₽`}
				description={`Средняя: ${stats.averageIncome.toFixed(2)} ₽`}
				color={TRADE_STATISTICS_CARDS.totalIncome.getColor(stats.totalIncome)}
			/>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.winRate.title}
				value={`${stats.winRate.toFixed(1)}%`}
				description={`Profit Factor: ${stats.profitFactor === Infinity ? '∞' : stats.profitFactor.toFixed(2)}`}
				color={TRADE_STATISTICS_CARDS.winRate.getColor(stats.winRate)}
			/>
		</SummaryList>
	);
}

export const StatisticsSummaryBoundary = withQueryBoundary(StatisticsSummary, {
	suspenseProps: {
		fallback: <StatisticsSummarySkeleton />,
	},
});
