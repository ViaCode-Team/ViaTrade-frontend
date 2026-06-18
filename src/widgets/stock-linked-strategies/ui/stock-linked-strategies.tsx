import { Stack } from '@mantine/core';

import {
	LinkedStrategiesControls,
	useLinkedStrategiesControls,
} from '@/features/strategy/filter-linked-strategies';

import { StockLinkedStrategiesListBoundary } from './stock-linked-strategies-list';
import { StockLinkedStrategiesStatusBarBoundary } from './stock-linked-strategies-status-bar';

type StockLinkedStrategiesProps = {
	stockId: number;
	onNavigate?: () => void;
};

export function StockLinkedStrategies({ stockId, onNavigate }: StockLinkedStrategiesProps) {
	const { filters, setFilter, page, setPage } = useLinkedStrategiesControls();

	return (
		<Stack gap='md'>
			<Stack gap='xs'>
				<LinkedStrategiesControls filters={filters} setFilter={setFilter} />
				<StockLinkedStrategiesStatusBarBoundary stockId={stockId} filters={filters} />
			</Stack>

			<StockLinkedStrategiesListBoundary
				stockId={stockId}
				filters={filters}
				page={page}
				setPage={setPage}
				onNavigate={onNavigate}
			/>
		</Stack>
	);
}
