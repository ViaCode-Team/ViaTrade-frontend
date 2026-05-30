import { Skeleton } from '@mantine/core';
import { useMemo } from 'react';

import {
	filterLinkedStrategies,
	LinkedStrategiesStatusBar,
	type LinkedStrategyFilters,
} from '@/features/strategy/filter-linked-strategies';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStockLinkedStrategies } from '../model/use-stock-linked-strategies';

type StockLinkedStrategiesStatusBarProps = {
	stockId: number;
	filters: LinkedStrategyFilters;
};

export function StockLinkedStrategiesStatusBar({ stockId, filters }: StockLinkedStrategiesStatusBarProps) {
	const { allLinkedStrategies } = useStockLinkedStrategies(stockId);
	const filteredStrategies = useMemo(
		() => filterLinkedStrategies(allLinkedStrategies, filters),
		[allLinkedStrategies, filters],
	);

	if (allLinkedStrategies.length === 0) {
		return null;
	}

	return (
		<LinkedStrategiesStatusBar
			totalCount={allLinkedStrategies.length}
			filteredCount={filteredStrategies.length}
		/>
	);
}

export const StockLinkedStrategiesStatusBarBoundary = withQueryBoundary(StockLinkedStrategiesStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={20} width='40%' />,
	},
});
