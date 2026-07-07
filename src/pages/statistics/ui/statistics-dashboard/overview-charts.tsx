import { useGetTradeStatisticsSuspense } from '@/entities/trade';
import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { DirectionPerformanceChartCardBoundary } from './direction-performance-chart-card';
import { IncomeChartCardBoundary } from './income-chart-card';
import { OverviewChartsSkeleton } from './overview-charts.skeleton';
import { ProfitChartCardBoundary } from './profit-chart-card';
import cls from './statistics-dashboard.module.css';
import { WinLossChartCardBoundary } from './win-loss-chart-card';

function StatisticsCharts() {
	const { data: statisticsResponse } = useGetTradeStatisticsSuspense();

	if (statisticsResponse.data.tradeStatistic.totalTrades === 0) {
		return (
			<AppEmptyState
				title='Статистика недоступна'
				description='Добавьте сделки, чтобы увидеть статистику.'
			/>
		);
	}

	return (
		<div className={cls.chartsGrid}>
			<ProfitChartCardBoundary />
			<WinLossChartCardBoundary />
			<IncomeChartCardBoundary />
			<DirectionPerformanceChartCardBoundary />
		</div>
	);
}

export const OverviewChartsBoundary = withQueryBoundary(StatisticsCharts, {
	suspenseProps: {
		fallback: <OverviewChartsSkeleton />,
	},
});
