import { useMemo } from 'react';

import type { LinkedStrategyFilters } from '@/features/strategy/filter-linked-strategies';

import { StockLinkedStrategiesList as LinkedStrategiesList, StockLinkedStrategiesListSkeleton } from '@/entities/strategy';
import { filterLinkedStrategies } from '@/features/strategy/filter-linked-strategies';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStockLinkedStrategies } from '../model/use-stock-linked-strategies';

export type StockLinkedStrategiesListProps = {
	stockId: number;
	filters: LinkedStrategyFilters;
	page: number;
	setPage: (page: number) => void;
	onNavigate?: () => void;
};

function StockLinkedStrategiesList({
	stockId,
	filters,
	page,
	setPage,
	onNavigate,
}: StockLinkedStrategiesListProps) {
	const { allLinkedStrategies, activeStrategyIds } = useStockLinkedStrategies(stockId);

	const filteredStrategies = useMemo(
		() => filterLinkedStrategies(allLinkedStrategies, filters),
		[allLinkedStrategies, filters],
	);

	return (
		<LinkedStrategiesList
			strategies={filteredStrategies}
			activeStrategyIds={activeStrategyIds}
			hasAnyStrategies={allLinkedStrategies.length > 0}
			page={page}
			setPage={setPage}
			onNavigate={onNavigate}
			actionSlot={(strategy, isActive) => (
				<StrategyToggleCheckbox
					strategyId={strategy.id}
					isActive={isActive}
				/>
			)}
		/>
	);
}

export const StockLinkedStrategiesListBoundary = withQueryBoundary(StockLinkedStrategiesList, {
	suspenseProps: {
		fallback: <StockLinkedStrategiesListSkeleton />,
	},
});
