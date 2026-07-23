import { useGetReminderStatisticsSuspense } from '@/entities/remind';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function RemindsSummary() {
	const { data: response } = useGetReminderStatisticsSuspense();
	const { totalReminders } = response.data;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={totalReminders} />
		</SummaryList>
	);
}

import { RemindsSummarySkeleton } from './reminds-summary.skeleton';

export const RemindsSummaryBoundary = withQueryBoundary(RemindsSummary, {
	suspenseProps: {
		fallback: <RemindsSummarySkeleton />,
	},
});
