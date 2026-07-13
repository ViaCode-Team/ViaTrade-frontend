import { useMemo } from 'react';

import type { LinkedStrategyFilters } from '@/widgets/stock-linked-strategies/ui/filter-linked-strategies';

import { StockLinkedStrategiesList as LinkedStrategiesList, StockLinkedStrategiesListSkeleton } from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { filterLinkedStrategies } from '@/widgets/stock-linked-strategies/ui/filter-linked-strategies';

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
		<DataState hasData={!!allLinkedStrategies.length} hasResults={!!filteredStrategies.length}>
			<LinkedStrategiesList
				strategies={filteredStrategies}
				activeStrategyIds={activeStrategyIds}
				page={page}
				setPage={setPage}
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
