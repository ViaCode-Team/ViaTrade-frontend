import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function StatisticsSummarySkeleton() {
	return (
		<SummaryList>
			<SummaryCard title='Всего сделок' isLoading />
			<SummaryCard title='Винрейт' isLoading />
			<SummaryCard title='Общая прибыль (PnL)' isLoading />
		</SummaryList>
	);
}
