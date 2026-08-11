import { useMemo } from 'react';

import type { StrategySortField } from '@/shared/api';
import type { LinkedStrategyFilters } from '@/widgets/stock-linked-strategies/ui/filter-linked-strategies';

import { useGetStrategiesByInstrumentSuspense } from '@/entities/instrument';
import {
	mapStrategyResponseToStrategy,
} from '@/entities/strategy';

export const STOCK_LINKED_STRATEGIES_PAGE_SIZE = 15;

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
	const { data: strategiesResponse } = useGetStrategiesByInstrumentSuspense(stockId, {
		page,
		pageSize,
		sortBy: [sortBy[filters.sortOption]],
	});
	const subscribedStrategyIds = useMemo(
		() => new Set(strategiesResponse.data.items.filter((strategy) => strategy.isSubscribed).map((strategy) => strategy.id)),
		[strategiesResponse.data.items],
	);
	const allLinkedStrategies = useMemo(
		() => strategiesResponse.data.items.map(mapStrategyResponseToStrategy),
		[strategiesResponse.data.items],
	);

	return {
		allLinkedStrategies,
		subscribedStrategyIds,
		totalCount: strategiesResponse.data.totalCount,
		totalPages: strategiesResponse.data.totalPages,
	};
}
