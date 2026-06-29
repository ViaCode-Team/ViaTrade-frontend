import { TRADE_STATISTICS_CARDS, useTradeStatisticsBase } from '@/entities/statistic';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { DashboardStatisticsSkeleton } from './dashboard-statistics.skeleton';

export function DashboardStatistics() {
	const { totalTrades, totalIncome, winRate } = useTradeStatisticsBase();

	return (
		<SummaryList>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.totalTrades.title}
				value={totalTrades}
			/>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.totalIncome.title}
				value={`${totalIncome.toFixed(2)} ₽`}
				color={TRADE_STATISTICS_CARDS.totalIncome.getColor(totalIncome)}
			/>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.winRate.title}
				value={`${winRate.toFixed(1)}%`}
				color={TRADE_STATISTICS_CARDS.winRate.getColor(winRate)}
			/>
		</SummaryList>
	);
}

export const DashboardStatisticsBoundary = withQueryBoundary(DashboardStatistics, {
	suspenseProps: {
		fallback: <DashboardStatisticsSkeleton />,
	},
});
