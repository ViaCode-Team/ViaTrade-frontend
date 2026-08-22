import { useMemo } from 'react';

import type { GetStrategiesParams } from '@/shared/api';

import {
	mapStrategyResponseToStrategy,
	useGetStrategiesSuspense,
} from '@/entities/strategy';

export const STRATEGIES_PAGE_SIZE = 15;

export function getStrategiesRequestParams(filters: {
	page: number;
	searchQuery: string;
	sortOption: 'name-asc' | 'name-desc' | 'accuracy-desc' | 'accuracy-asc';
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
		searchText: filters.searchQuery.trim() || undefined,
		sortBy: [sortBy[filters.sortOption]],
	};
}

export function useStrategiesData(params: GetStrategiesParams = getStrategiesRequestParams({ page: 1, searchQuery: '', sortOption: 'name-asc' })) {
	const strategiesQuery = useGetStrategiesSuspense(params);

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
