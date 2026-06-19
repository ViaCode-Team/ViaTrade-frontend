import { Skeleton } from '@mantine/core';
import { useMemo } from 'react';

import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import {
	filterLinkedStrategies,
	LinkedStrategiesStatusBar,
	type LinkedStrategyFilters,
} from '@/widgets/stock-linked-strategies/ui/filter-linked-strategies';

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
