import { useMemo } from 'react';

import type { StrategySortField } from '@/shared/api';
import type { LinkedStrategyFilters } from '@/widgets/stock-linked-strategies/ui/filter-linked-strategies';

import {
	mapTradeStrategyToStrategy,
} from '@/entities/strategy';
import { useGetStrategiesByStockSuspense } from '@/entities/trade-code';

export const STOCK_LINKED_STRATEGIES_PAGE_SIZE = 12;

export function useStockLinkedStrategies(
	stockId: number,
	page: number,
	pageSize: number,
	filters: LinkedStrategyFilters,
) {
	const sortBy: Record<LinkedStrategyFilters['sortOption'], StrategySortField> = {
		'name-asc': 'nameAsc',
		'name-desc': 'nameDesc',
		'accuracy-desc': 'accuracyDesc',
		'accuracy-asc': 'accuracyAsc',
	};
	const { data: strategiesResponse } = useGetStrategiesByStockSuspense(stockId, {
		page,
		pageSize,
		sortBy: [sortBy[filters.sortOption]],
		isActive: filters.statusFilter === 'all' ? undefined : filters.statusFilter === 'active',
	});
	const activeStrategyIds = useMemo(
		() => new Set(strategiesResponse.data.items.filter((strategy) => strategy.isActive).map((strategy) => strategy.id)),
		[strategiesResponse.data.items],
	);
	const allLinkedStrategies = useMemo(
		() => strategiesResponse.data.items.map((strategy) => mapTradeStrategyToStrategy(strategy, activeStrategyIds)),
		[activeStrategyIds, strategiesResponse.data.items],
	);

	return {
		allLinkedStrategies,
		activeStrategyIds,
		totalCount: strategiesResponse.data.totalCount,
		totalPages: strategiesResponse.data.totalPages,
	};
}
