import { PageHeader } from '@/shared/ui/page-header';
import { StrategiesOverview } from '@/widgets/strategies-overview';

import { StrategiesSummaryBoundary } from './ui/strategies-summary';

export function StrategiesPage() {
	return (
		<>
			<PageHeader
				title='Стратегии'
				description='Подберите стратегию под свой стиль торговли и горизонт инвестирования.'
			/>

			<StrategiesSummaryBoundary />

			<StrategiesOverview />
		</>
	);
}
