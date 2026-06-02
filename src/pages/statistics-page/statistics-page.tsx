import { AddTradeButton } from '@/features/statistic/add-trade';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { StatisticsDashboard } from '@/widgets/statistics-dashboard';
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
