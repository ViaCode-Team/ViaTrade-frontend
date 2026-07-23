import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import type { GetStrategiesParams } from '@/shared/api';

import {
	getGetStrategiesSuspenseQueryOptions,
	getGetUserStrategiesSuspenseQueryOptions,
	type GetStrategiesSuspenseQueryError,
	type GetStrategiesSuspenseQueryResult,
	type GetUserStrategiesSuspenseQueryError,
	type GetUserStrategiesSuspenseQueryResult,
	mapTradeStrategiesToStrategies,
} from '@/entities/strategy';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

export const STRATEGIES_PAGE_SIZE = 10;

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

type StrategiesQueries = [
	{
		queryFnData: GetStrategiesSuspenseQueryResult;
		error: GetStrategiesSuspenseQueryError;
	},
	{
		queryFnData: GetUserStrategiesSuspenseQueryResult;
		error: GetUserStrategiesSuspenseQueryError;
	},
];

export function useStrategiesData(params: GetStrategiesParams = getStrategiesRequestParams({ page: 1, sortOption: 'name-asc', statusFilter: 'all' })) {
	const [strategiesQuery, userStrategiesQuery] = useSuspenseQueries<StrategiesQueries>({
		queries: [
			{ ...getGetStrategiesSuspenseQueryOptions(params), refetchInterval: QUERY_REFETCH_INTERVAL },
			{ ...getGetUserStrategiesSuspenseQueryOptions({ page: 1, pageSize: 100 }), refetchInterval: QUERY_REFETCH_INTERVAL },
		],
	});

	const strategies = useMemo(
		() =>
			mapTradeStrategiesToStrategies(
				strategiesQuery.data.data.items,
				userStrategiesQuery.data.data.items,
			),
		[strategiesQuery.data.data.items, userStrategiesQuery.data.data.items],
	);

	const refetch = () => {
		void strategiesQuery.refetch();
		void userStrategiesQuery.refetch();
	};

	return {
		strategies,
		page: strategiesQuery.data.data.page,
		totalPages: strategiesQuery.data.data.totalPages,
		totalCount: strategiesQuery.data.data.totalCount,
		refetch,
	};
}
