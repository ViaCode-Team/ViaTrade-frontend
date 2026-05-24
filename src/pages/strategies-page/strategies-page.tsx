import { PageHeader } from '@/shared/ui/page-header';

import { StrategiesListBoundary } from './ui/strategies-grid';
import { StrategiesSummaryBoundary } from './ui/strategies-summary';

export function StrategiesPage() {
	return (
		<>
			<PageHeader
				title='Стратегии'
				description='Подберите стратегию под свой стиль торговли и горизонт инвестирования.'
			/>

			<StrategiesSummaryBoundary />

			<StrategiesListBoundary />
		</>
	);
}
