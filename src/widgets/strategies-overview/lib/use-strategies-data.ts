import { useMemo } from 'react';

import type { GetStrategiesParams } from '@/shared/api';

import {
	mapStrategyResponseToStrategy,
	useGetStrategiesSuspense,
} from '@/entities/strategy';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

export const STRATEGIES_PAGE_SIZE = 15;

export function getStrategiesRequestParams(filters: {
	page: number;
	sortOption: 'name-asc' | 'name-desc' | 'accuracy-desc' | 'accuracy-asc';
	statusFilter: 'all' | 'subscribed' | 'unsubscribed';
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
	};
}

export function useStrategiesData(params: GetStrategiesParams = getStrategiesRequestParams({ page: 1, sortOption: 'name-asc', statusFilter: 'all' })) {
	const strategiesQuery = useGetStrategiesSuspense(params, { query: { refetchInterval: QUERY_REFETCH_INTERVAL } });

	const strategies = useMemo(
		() => {
			return strategiesQuery.data.data.items.map(mapStrategyResponseToStrategy);
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
