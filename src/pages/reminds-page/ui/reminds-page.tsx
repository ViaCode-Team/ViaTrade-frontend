import { RemindList } from '@/features/remind';
import { useRemindList } from '@/features/remind';
import { PageHeader } from '@/shared/ui/page-header';

import { RemindsSummary } from './reminds-summary';

export function RemindsPage() {
	const remindList = useRemindList();

	return (
		<>
			<PageHeader
				title='Напоминания'
				description='Создавайте напоминания по акциям и стратегиям, чтобы не пропустить важные моменты.'
			/>

			<RemindsSummary reminds={remindList.reminds} />

			<RemindList
				{...remindList}
				emptyText='Напоминаний пока нет. Нажмите «+», чтобы добавить первое.'
			/>
		</>
	);
}
