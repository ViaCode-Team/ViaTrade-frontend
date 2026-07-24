import { RemindsOverview } from '@/pages/reminds/ui/reminds-overview';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

import { RemindsSummaryBoundary } from './ui/reminds-overview/reminds-summary';

export function RemindsPage() {
	return (
		<>
			<PageHeader
				title='Напоминания'
				description='Ваши напоминания по акциям и стратегиям'
				rightSection={<DataFreshness />}
			/>

			<Section>
				<RemindsSummaryBoundary />
			</Section>

			<Section header={{ title: 'Список напоминаний' }}>
				<RemindsOverview />
			</Section>
		</>
	);
}
