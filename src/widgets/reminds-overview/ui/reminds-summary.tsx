import { useRemindContext } from '@/entities/remind';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function RemindsSummary() {
	const { reminds, isLoading } = useRemindContext();
	const total = reminds.length;
	const active = reminds.filter((r) => r.text.trim().length > 0).length;
	const empty = total - active;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} isLoading={isLoading} />
			<SummaryCard title='Заполненные' value={active} color='blue' isLoading={isLoading} />
			<SummaryCard title='Без текста' value={empty} color='gray' isLoading={isLoading} />
		</SummaryList>
	);
}
