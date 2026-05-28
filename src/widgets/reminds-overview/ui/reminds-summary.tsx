import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { mapTradeRemindToRemindItem } from '@/entities/remind';
import { getGetAllByUserSuspenseQueryOptions } from '@/entities/remind/api/gen';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function RemindsSummary() {
	const { data: response } = useSuspenseQuery(getGetAllByUserSuspenseQueryOptions());
	const reminds = response.data.map(mapTradeRemindToRemindItem);

	const total = reminds.length;
	const [now] = useState(() => Date.now());

	let upcoming = 0;
	let past = 0;

	reminds.forEach((remind) => {
		if (!remind.date || !remind.time) {
			return; // Skip invalid dates
		}

		const remindDate = new Date(`${remind.date}T${remind.time}`).getTime();

		if (remindDate >= now) {
			upcoming++;
		}
		else {
			past++;
		}
	});

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} />
			<SummaryCard title='Актуальные' value={upcoming} color='blue' />
			<SummaryCard title='Прошедшие' value={past} color='gray' />
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
