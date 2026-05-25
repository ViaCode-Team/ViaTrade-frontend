import { PageHeader } from '@/shared/ui/page-header';
import { StatisticsDashboard } from '@/widgets/statistics-dashboard';

export function StatisticsPage() {
	return (
		<>
			<PageHeader
				title='Статистика'
				description='Аналитика и графики по вашим сделкам и доходу.'
			/>

			<StatisticsDashboard />
		</>
	);
}
