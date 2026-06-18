import { RemindsOverview } from '@/pages/reminds-page/ui/reminds-overview';
import { PageHeader } from '@/shared/ui/page-header';

export function RemindsPage() {
	return (
		<>
			<PageHeader
				title='Напоминания'
				description='Ваши напоминания по акциям и стратегиям'
			/>

			<RemindsOverview />
		</>
	);
}
