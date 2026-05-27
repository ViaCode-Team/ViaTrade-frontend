import { useState } from 'react';

import { useRemindContext } from '@/entities/remind';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function RemindsSummary() {
	const { reminds, isLoading } = useRemindContext();
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
			<SummaryCard title='Всего' value={total} isLoading={isLoading} />
			<SummaryCard title='Актуальные' value={upcoming} color='blue' isLoading={isLoading} />
			<SummaryCard title='Прошедшие' value={past} color='gray' isLoading={isLoading} />
		</SummaryList>
	);
}
