import { PageHeader } from '@/shared/ui/page-header';
import { RemindsOverviewWidget } from '@/widgets/reminds-overview-widget';

export function RemindsPage() {
	return (
		<>
			<PageHeader
				title='Напоминания'
				description='Ваши напоминания по акциям и стратегиям'
			/>

			<RemindsOverviewWidget />
		</>
	);
}
