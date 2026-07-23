import { useMemo } from 'react';

import type { Strategy } from '@/entities/strategy';

import { useUrlFilters } from '@/shared/lib/url-filters';

import { strategyFiltersSchema } from './filters';

export function useFilteredStrategies(strategies: Strategy[]) {
	const { filters } = useUrlFilters(strategyFiltersSchema);

	const searchQuery = filters.q;

	return useMemo(() => {
		let result = strategies;

		const normalizedSearch = searchQuery.trim().toLowerCase();

		if (normalizedSearch) {
			result = result.filter((strategy) =>
				strategy.name.toLowerCase().includes(normalizedSearch),
			);
		}

		return result;
	}, [
		strategies,
		searchQuery,
	]);
}
