import { DataFreshness } from '@/shared/ui/data-freshness';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

import { StatisticsOverview } from './ui/statistics-overview/statistics-overview';
import { StatisticsSummaryBoundary } from './ui/statistics-summary/statistics-summary';

export function StatisticsPage() {
	return (
		<>
			<PageHeader
				title='Статистика'
				description='Сводка и графики по сделкам и доходу'
				rightSection={<DataFreshness />}
			/>

			<Section>
				<StatisticsSummaryBoundary />
			</Section>

			<Section>
				<StatisticsOverview />
			</Section>
		</>
	);
}
