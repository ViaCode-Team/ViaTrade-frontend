import { AddTradeButton } from '@/features/statistic/add-trade';
import { StatisticsDashboard } from '@/pages/statistics-page/ui/statistics-dashboard';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { TradesHistory } from '@/widgets/trades-history';

import { StatisticsSummary } from './ui/statistics-summary/statistics-summary';

export function StatisticsPage() {
	return (
		<>
			<PageHeader
				title='Статистика'
				description='Аналитика по сделкам и доходу'
			/>
			<Section>
				<StatisticsSummary />
			</Section>

			<Section>
				<StatisticsDashboard />
			</Section>

			<Section header={{ title: 'История сделок', actions: <AddTradeButton /> }}>
				<TradesHistory />
			</Section>
		</>
	);
}
