import { AddTradeButton } from '@/features/statistic/add';
import { StatisticsDashboardBoundary } from '@/pages/statistics/ui/statistics-dashboard';
import { TradesHistory } from '@/pages/statistics/ui/trades-history';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

import { StatisticsSummaryBoundary } from './ui/statistics-summary/statistics-summary';

export function StatisticsPage() {
	return (
		<>
			<PageHeader
				title='Статистика'
				description='Аналитика по сделкам и доходу'
			/>
			<Section>
				<StatisticsSummaryBoundary />
			</Section>

			<Section>
				<StatisticsDashboardBoundary />
			</Section>

			<Section header={{ title: 'История сделок', actions: <AddTradeButton /> }}>
				<TradesHistory />
			</Section>
		</>
	);
}
