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
				title='Всего сделок'
				value={stats.totalTrades}
				description={`Прибыльных: ${stats.profitableTrades} | Убыточных: ${stats.losingTrades}`}
			/>
			<SummaryCard
				title='Общая прибыль'
				value={`${stats.netProfit.toLocaleString('ru-RU', { minimumFractionDigits: 2 })} ₽`}
				description={`Средняя: ${stats.averageProfit.toFixed(2)} ₽`}
				color={stats.netProfit >= 0 ? 'green' : 'red'}
			/>
			<SummaryCard
				title='Win Rate'
				value={`${stats.winRate.toFixed(1)}%`}
				description={`Profit Factor: ${stats.profitFactor === Infinity ? '∞' : stats.profitFactor.toFixed(2)}`}
				color={stats.winRate >= 50 ? 'green' : 'red'}
			/>
		</SummaryList>
	);
}

export const DashboardStatisticsBoundary = withQueryBoundary(DashboardStatistics, {
	suspenseProps: {
		fallback: <DashboardStatisticsSkeleton />,
	},
});
