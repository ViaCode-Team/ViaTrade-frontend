import { useGetReminderStatisticsSuspense } from '@/entities/reminder';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

const REMINDER_LIMIT_WARNING_THRESHOLD = 0.2;

export function RemindsSummary() {
	const { data: response } = useGetReminderStatisticsSuspense();
	const {
		totalReminders,
		maximumReminders,
		remainingReminders,
	} = response.data;
	const isReminderLimitNearlyReached = maximumReminders > 0
		&& remainingReminders / maximumReminders <= REMINDER_LIMIT_WARNING_THRESHOLD;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={totalReminders} />
			{isReminderLimitNearlyReached && (
				<SummaryCard
					title='Лимит напоминаний'
					value={`${remainingReminders} из ${maximumReminders}`}
					color={remainingReminders === 0 ? 'red' : 'orange'}
				/>
			)}
		</SummaryList>
	);
}

import { RemindsSummarySkeleton } from './reminds-summary.skeleton';

export const RemindsSummaryBoundary = withQueryBoundary(RemindsSummary, {
	suspenseProps: {
		fallback: <RemindsSummarySkeleton />,
	},
});
