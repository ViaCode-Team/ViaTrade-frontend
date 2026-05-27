import { PageHeader } from '@/shared/ui/page-header';
import { RemindsOverview } from '@/widgets/reminds-overview';

export function RemindsPage() {
	return (
		<>
			<PageHeader
				title='Напоминания'
				description='Создавайте напоминания по акциям и стратегиям, чтобы не пропустить важные моменты.'
			/>

			<RemindsOverview />
		</>
	);
}
