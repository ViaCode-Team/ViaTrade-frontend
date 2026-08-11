import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/url-filters';

import { strategyFiltersSchema } from './filters';
import { getFilteredStrategies } from './use-filtered-strategies';
import { getStrategiesRequestParams, useStrategiesData } from './use-strategies-data';

export function useStrategiesOverview() {
	const { filters, setFilter, resetFilters } = useUrlFilters(strategyFiltersSchema);

	const page = Math.max(Number(filters.page) || 1, 1);
	const { strategies, totalPages, totalCount } = useStrategiesData(getStrategiesRequestParams({
		page,
		sortOption: filters.listSort,
		statusFilter: filters.statusFilter,
	}));

	const filteredStrategies = useMemo(
		() => getFilteredStrategies(strategies, filters.q, filters.statusFilter),
		[filters.q, filters.statusFilter, strategies],
	);

	const subscribedCount = filteredStrategies.filter((strategy) => strategy.isSubscribed).length;

	return {
		filters,
		page,
		strategies,
		filteredStrategies,
		subscribedCount,
		unsubscribedCount: filteredStrategies.length - subscribedCount,
		totalPages,
		totalCount,
		setPage: (nextPage: number) => setFilter('page', String(nextPage)),
		resetFilters,
	};
}
