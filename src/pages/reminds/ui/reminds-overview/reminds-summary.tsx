import { mapTradeRemindToRemindItem } from '@/entities/remind';
import { useGetAllByUserSuspense } from '@/entities/remind';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function RemindsSummary() {
	const { data: response } = useGetAllByUserSuspense();
	const reminds = response.data
		.map(mapTradeRemindToRemindItem)
		.filter((remind) => {
			if (!remind.date || !remind.time) {
				return false;
			}
			const remindDate = new Date(`${remind.date}T${remind.time}`).getTime();
			return remindDate >= Date.now();
		});

	const total = reminds.length;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} />
			<SummaryCard title='Актуальные' value={total} color='blue' />
		</SummaryList>
	);
}

import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { RemindsSummarySkeleton } from './reminds-summary.skeleton';

export const RemindsSummaryBoundary = withQueryBoundary(RemindsSummary, {
	suspenseProps: {
		fallback: <RemindsSummarySkeleton />,
	},
});
