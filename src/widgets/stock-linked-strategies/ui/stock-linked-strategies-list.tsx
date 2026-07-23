import { useMemo, useState } from 'react';

import type { LinkedStrategyFilters } from '@/widgets/stock-linked-strategies/ui/filter-linked-strategies';

import {
	StockLinkedStrategiesList as LinkedStrategiesList,
	StockLinkedStrategiesListSkeleton,
} from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { filterLinkedStrategies } from '@/widgets/stock-linked-strategies/ui/filter-linked-strategies';

import {
	STOCK_LINKED_STRATEGIES_PAGE_SIZE,
	useStockLinkedStrategies,
} from '../model/use-stock-linked-strategies';

export type StockLinkedStrategiesListProps = {
	stockId: number;
	filters: LinkedStrategyFilters;
	onNavigate?: () => void;
};

function StockLinkedStrategiesList({
	stockId,
	filters,
	onNavigate,
}: StockLinkedStrategiesListProps) {
	const [page, setPage] = useState(1);
	const {
		allLinkedStrategies,
		activeStrategyIds,
		totalCount,
		totalPages,
	} = useStockLinkedStrategies(stockId, page, STOCK_LINKED_STRATEGIES_PAGE_SIZE);

	const filteredStrategies = useMemo(
		() => filterLinkedStrategies(allLinkedStrategies, filters),
		[allLinkedStrategies, filters],
	);

	return (
		<DataState hasData={!!totalCount} hasResults={!!filteredStrategies.length}>
			<LinkedStrategiesList
				strategies={filteredStrategies}
				activeStrategyIds={activeStrategyIds}
				pagination={{ page, totalPages, onPageChange: setPage }}
				onNavigate={onNavigate}
				renderAction={(strategy, isActive) => (
					<StrategyToggleCheckbox
						strategyId={strategy.id}
						isActive={isActive}
					/>
				)}
			/>
		</DataState>
	);
}

export const StockLinkedStrategiesListBoundary = withQueryBoundary(StockLinkedStrategiesList, {
	suspenseProps: {
		fallback: <StockLinkedStrategiesListSkeleton />,
	},
});
