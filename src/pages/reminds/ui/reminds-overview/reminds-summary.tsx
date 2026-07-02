import { useGetRemindStatisticsSuspense } from '@/entities/remind';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function RemindsSummary() {
	const { data: response } = useGetRemindStatisticsSuspense();
	const { totalReminds } = response.data;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={totalReminds} />
		</SummaryList>
	);
}

import { RemindsSummarySkeleton } from './reminds-summary.skeleton';

export const RemindsSummaryBoundary = withQueryBoundary(RemindsSummary, {
	suspenseProps: {
		fallback: <RemindsSummarySkeleton />,
	},
});
