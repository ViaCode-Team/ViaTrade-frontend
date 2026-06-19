import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function DashboardStatisticsSkeleton() {
	return (
		<SummaryList>
			<SummaryCard title='Всего сделок' isLoading />
			<SummaryCard title='Общая прибыль' isLoading />
			<SummaryCard title='Win Rate' isLoading />
			<SummaryCard title='Среднее время на сделку' isLoading />
		</SummaryList>
	);
}
