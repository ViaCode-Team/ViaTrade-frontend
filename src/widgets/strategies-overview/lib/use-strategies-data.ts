import { useSuspenseQueries } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
	type GetAllSuspenseQueryError,
	type GetAllSuspenseQueryResult,
	getGetAllSuspenseQueryOptions,
	getGetUsersStrategySuspenseQueryOptions,
	type GetUsersStrategySuspenseQueryError,
	type GetUsersStrategySuspenseQueryResult,
	mapTradeStrategiesToStrategies,
} from '@/entities/strategy';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

type StrategiesQueries = [
	{
		queryFnData: GetAllSuspenseQueryResult;
		error: GetAllSuspenseQueryError;
	},
	{
		queryFnData: GetUsersStrategySuspenseQueryResult;
		error: GetUsersStrategySuspenseQueryError;
	},
];

export function useStrategiesData() {
	const [strategiesQuery, userStrategiesQuery] = useSuspenseQueries<StrategiesQueries>({
		queries: [
			{ ...getGetAllSuspenseQueryOptions(), refetchInterval: QUERY_REFETCH_INTERVAL },
			{ ...getGetUsersStrategySuspenseQueryOptions(), refetchInterval: QUERY_REFETCH_INTERVAL },
		],
	});

	const strategies = useMemo(
		() =>
			mapTradeStrategiesToStrategies(
				strategiesQuery.data.data,
				userStrategiesQuery.data.data,
			),
		[strategiesQuery.data.data, userStrategiesQuery.data.data],
	);

	const refetch = () => {
		void strategiesQuery.refetch();
		void userStrategiesQuery.refetch();
	};

	return {
		strategies,
		refetch,
	};
}
