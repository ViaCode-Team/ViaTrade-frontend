import { RemindsOverview } from '@/pages/reminds/ui/reminds-overview';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { PageHeader } from '@/shared/ui/page-header';

export function RemindsPage() {
	return (
		<>
			<PageHeader
				title='Напоминания'
				description='Ваши напоминания по акциям и стратегиям'
				rightSection={<DataFreshness />}
			/>

			<RemindsOverview />
		</>
	);
}
