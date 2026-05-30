import { PageHeader } from '@/shared/ui/page-header';
import { RemindsOverview } from '@/widgets/reminds-overview';

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
