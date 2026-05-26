import { PageHeader } from '@/shared/ui/page-header';
import { StatisticsDashboard } from '@/widgets/statistics-dashboard';

import { StatisticsSummary } from './ui/statistics-summary/statistics-summary';

export function StatisticsPage() {
	return (
		<>
			<PageHeader
				title='Статистика'
				description='Аналитика и графики по вашим сделкам и доходу.'
			/>
			<StatisticsSummary />

			<StatisticsDashboard />
		</>
	);
}
