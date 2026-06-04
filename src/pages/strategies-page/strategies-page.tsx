import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';
import { StrategiesOverviewWidget } from '@/widgets/strategies-overview-widget';

import { StrategiesSummaryBoundary } from './ui/strategies-summary';

export function StrategiesPage() {
	return (
		<>
			<PageHeader
				title='Стратегии'
				description='Выберите стратегию под свой стиль торговли'
			/>

			<Section>
				<StrategiesSummaryBoundary />
			</Section>

			<Section header={{ title: 'Список стратегий' }}>
				<StrategiesOverviewWidget />
			</Section>
		</>
	);
}
