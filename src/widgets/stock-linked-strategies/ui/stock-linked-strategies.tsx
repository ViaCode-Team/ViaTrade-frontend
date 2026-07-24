import { Stack } from '@mantine/core';

import {
	LinkedStrategiesControls,
	useLinkedStrategiesControls,
} from '@/widgets/stock-linked-strategies/ui/filter-linked-strategies';

import { StockLinkedStrategiesListBoundary } from './stock-linked-strategies-list';

type StockLinkedStrategiesProps = {
	stockId: number;
	onNavigate?: () => void;
};

export function StockLinkedStrategies({ stockId, onNavigate }: StockLinkedStrategiesProps) {
	const { filters, setFilter, resetFilters } = useLinkedStrategiesControls();

	return (
		<Stack gap='md'>
			<LinkedStrategiesControls
				filters={filters}
				setFilter={setFilter}
			/>

			<StockLinkedStrategiesListBoundary
				stockId={stockId}
				filters={filters}
				onResetFilters={resetFilters}
				onNavigate={onNavigate}
			/>
		</Stack>
	);
}
