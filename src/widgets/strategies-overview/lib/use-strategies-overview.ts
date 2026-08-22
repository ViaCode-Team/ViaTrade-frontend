import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/url-filters';

import { filterStrategiesBySubscription } from './filter-strategies';
import { strategyFiltersSchema } from './filters';
import { getStrategiesRequestParams, useStrategiesData } from './use-strategies-data';

export function useStrategiesOverview() {
	const { filters, setFilter, resetFilters } = useUrlFilters(strategyFiltersSchema);

	const page = Math.max(Number(filters.page) || 1, 1);
	const { strategies, totalPages, totalCount } = useStrategiesData(getStrategiesRequestParams({
		page,
		searchQuery: filters.q,
		sortOption: filters.listSort,
	}));

	const filteredStrategies = useMemo(
		() => filterStrategiesBySubscription(strategies, filters.statusFilter),
		[filters.statusFilter, strategies],
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
