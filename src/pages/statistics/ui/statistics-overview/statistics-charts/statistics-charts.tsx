import { useGetTradeStatisticsSuspense } from '@/entities/trade';
import { NoDataState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { DirectionPerformanceChartCardBoundary } from './direction-performance-chart-card';
import { IncomeChartCardBoundary } from './income-chart-card';
import { ProfitChartCardBoundary } from './profit-chart-card';
import cls from './statistics-charts.module.css';
import { StatisticsChartsSkeleton } from './statistics-charts.skeleton';
import { WinLossChartCardBoundary } from './win-loss-chart-card';

function StatisticsCharts() {
	const { data: statisticsResponse } = useGetTradeStatisticsSuspense();

	if (statisticsResponse.data.tradeStatistic.totalTrades === 0)
		return <NoDataState />;

	return (
		<div className={cls.chartsGrid}>
			<ProfitChartCardBoundary />

			<WinLossChartCardBoundary />

			<IncomeChartCardBoundary />

			<DirectionPerformanceChartCardBoundary />
		</div>
	);
}

export const StatisticsChartsBoundary = withQueryBoundary(StatisticsCharts, {
	suspenseProps: {
		fallback: <StatisticsChartsSkeleton />,
	},
});
