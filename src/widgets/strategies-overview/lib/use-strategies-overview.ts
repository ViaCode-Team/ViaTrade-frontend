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
import { strategyFiltersSchema } from '@/features/strategy/filter-strategies/model/filters';
import { useUrlFilters } from '@/shared/lib/hooks';

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

export function useStrategiesOverview() {
	const [strategiesQuery, userStrategiesQuery] = useSuspenseQueries<StrategiesQueries>({
		queries: [
			{ ...getGetAllSuspenseQueryOptions(), refetchInterval: 300000 },
			{ ...getGetUsersStrategySuspenseQueryOptions(), refetchInterval: 300000 },
		],
	});
	const { filters } = useUrlFilters(strategyFiltersSchema);
	const searchQuery = filters.q;
	const sortOption = filters.listSort;
	const statusFilter = filters.statusFilter;

	const strategies = useMemo(
		() =>
			mapTradeStrategiesToStrategies(
				strategiesQuery.data.data,
				userStrategiesQuery.data.data,
			),
		[strategiesQuery.data.data, userStrategiesQuery.data.data],
	);

	const filteredStrategies = useMemo(() => {
		let result = strategies;

		const normalizedSearch = searchQuery.toLowerCase().trim();
		if (normalizedSearch) {
			result = result.filter((strategy) => strategy.name.toLowerCase().includes(normalizedSearch));
		}

		if (statusFilter === 'active') {
			result = result.filter((strategy) => strategy.isActive);
		}
		else if (statusFilter === 'inactive') {
			result = result.filter((strategy) => !strategy.isActive);
		}

		result = [...result].sort((a, b) => {
			switch (sortOption) {
				case 'name-asc':
					return a.name.localeCompare(b.name);
				case 'name-desc':
					return b.name.localeCompare(a.name);
				case 'accuracy-desc':
					return (b.accuracy ?? 0) - (a.accuracy ?? 0);
				case 'accuracy-asc':
					return (a.accuracy ?? 0) - (b.accuracy ?? 0);
				default:
					return 0;
			}
		});

		return result;
	}, [strategies, searchQuery, sortOption, statusFilter]);

	const refetch = () => {
		void strategiesQuery.refetch();
		void userStrategiesQuery.refetch();
	};

	return {
		strategies,
		filteredStrategies,
		refetch,
	};
}
