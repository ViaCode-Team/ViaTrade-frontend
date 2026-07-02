import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function RemindsSummarySkeleton() {
	return (
		<SummaryList>
			<SummaryCard title='Всего' isLoading />
		</SummaryList>
	);
}
