import { TRADE_STATISTICS_CARDS } from '@/entities/statistic';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { useDashboardStatistics } from '../utils/use-dashboard-statistics';
import { DashboardStatisticsSkeleton } from './dashboard-statistics.skeleton';

export function DashboardStatistics() {
	const stats = useDashboardStatistics();

	return (
		<SummaryList>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.totalTrades.title}
				value={stats.totalTrades}
			/>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.totalIncome.title}
				value={`${stats.totalIncome.toFixed(2)} ₽`}
				color={TRADE_STATISTICS_CARDS.totalIncome.getColor(stats.totalIncome)}
			/>
			<SummaryCard
				title={TRADE_STATISTICS_CARDS.winRate.title}
				value={`${stats.winRate.toFixed(1)}%`}
				color={TRADE_STATISTICS_CARDS.winRate.getColor(stats.winRate)}
			/>
		</SummaryList>
	);
}

export const DashboardStatisticsBoundary = withQueryBoundary(DashboardStatistics, {
	suspenseProps: {
		fallback: <DashboardStatisticsSkeleton />,
	},
});
