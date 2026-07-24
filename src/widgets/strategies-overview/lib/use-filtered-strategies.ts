import { useMemo } from 'react';

import type { Strategy } from '@/entities/strategy';

import { useUrlFilters } from '@/shared/lib/url-filters';

import { strategyFiltersSchema } from './filters';

export function useFilteredStrategies(strategies: Strategy[]) {
	const { filters } = useUrlFilters(strategyFiltersSchema);

	const searchQuery = filters.q;

	return useMemo(() => getFilteredStrategies(strategies, searchQuery), [strategies, searchQuery]);
}

export function getFilteredStrategies(strategies: Strategy[], searchQuery: string) {
	const normalizedSearch = searchQuery.trim().toLowerCase();

	if (!normalizedSearch)
		return strategies;

	return strategies.filter((strategy) => strategy.name.toLowerCase().includes(normalizedSearch));
}
