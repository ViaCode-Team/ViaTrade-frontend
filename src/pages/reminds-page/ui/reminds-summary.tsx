import type { RemindItem } from '@/features/remind';

import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type RemindsSummaryProps = {
	reminds: RemindItem[];
};

export function RemindsSummary({ reminds }: RemindsSummaryProps) {
	const total = reminds.length;
	const active = reminds.filter((r) => r.text.trim().length > 0).length;
	const empty = total - active;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} />
			<SummaryCard title='Заполненные' value={active} color='blue' />
			<SummaryCard title='Без текста' value={empty} color='gray' />
		</SummaryList>
	);
}
