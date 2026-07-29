import { useMemo } from 'react';

import type { Strategy } from '@/entities/strategy';

import { useUrlFilters } from '@/shared/lib/url-filters';

import { strategyFiltersSchema, type StrategyStatusFilter } from './filters';

export function useFilteredStrategies(strategies: Strategy[]) {
	const { filters } = useUrlFilters(strategyFiltersSchema);

	const searchQuery = filters.q;

	return useMemo(() => getFilteredStrategies(strategies, searchQuery), [strategies, searchQuery]);
}

export function getFilteredStrategies(
	strategies: Strategy[],
	searchQuery: string,
	statusFilter: StrategyStatusFilter = 'all',
) {
	const normalizedSearch = searchQuery.trim().toLowerCase();

	return strategies.filter((strategy) => {
		const matchesSearch = !normalizedSearch || strategy.name.toLowerCase().includes(normalizedSearch);
		const matchesStatus = statusFilter === 'all' || (statusFilter === 'active' && strategy.isActive)
			|| (statusFilter === 'inactive' && !strategy.isActive);

		return matchesSearch && matchesStatus;
	});
}
