import { useMemo } from 'react';

import type { GetStrategiesParams } from '@/shared/api';

import {
	mapTradeStrategyToStrategy,
	useGetStrategiesSuspense,
} from '@/entities/strategy';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

export const STRATEGIES_PAGE_SIZE = 15;

export function getStrategiesRequestParams(filters: {
	page: number;
	sortOption: 'name-asc' | 'name-desc' | 'accuracy-desc' | 'accuracy-asc';
	statusFilter: 'all' | 'active' | 'inactive';
}): GetStrategiesParams {
	const sortBy = {
		'name-asc': 'nameAsc',
		'name-desc': 'nameDesc',
		'accuracy-asc': 'accuracyAsc',
		'accuracy-desc': 'accuracyDesc',
	} as const;

	return {
		page: filters.page,
		pageSize: STRATEGIES_PAGE_SIZE,
		sortBy: [sortBy[filters.sortOption]],
		isActive: filters.statusFilter === 'all' ? undefined : filters.statusFilter === 'active',
	};
}

export function useStrategiesData(params: GetStrategiesParams = getStrategiesRequestParams({ page: 1, sortOption: 'name-asc', statusFilter: 'all' })) {
	const strategiesQuery = useGetStrategiesSuspense(params, { query: { refetchInterval: QUERY_REFETCH_INTERVAL } });

	const strategies = useMemo(
		() => {
			const activeStrategyIds = new Set(
				strategiesQuery.data.data.items
					.filter((strategy) => strategy.isActive)
					.map((strategy) => strategy.id),
			);

			return strategiesQuery.data.data.items.map((strategy) =>
				mapTradeStrategyToStrategy(strategy, activeStrategyIds),
			);
		},
		[strategiesQuery.data.data.items],
	);

	return {
		strategies,
		page: strategiesQuery.data.data.page,
		totalPages: strategiesQuery.data.data.totalPages,
		totalCount: strategiesQuery.data.data.totalCount,
		refetch: strategiesQuery.refetch,
	};
}
