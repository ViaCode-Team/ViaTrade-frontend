import { useMemo } from 'react';

import type { Strategy } from '@/entities/strategy';

import { useUrlFilters } from '@/shared/lib/url-filters';

import { strategyFiltersSchema } from './filters';

export function useFilteredStrategies(strategies: Strategy[]) {
	const { filters } = useUrlFilters(strategyFiltersSchema);

	const searchQuery = filters.q;
	const sortOption = filters.listSort;
	const statusFilter = filters.statusFilter;

	return useMemo(() => {
		let result = strategies;

		const normalizedSearch = searchQuery.trim().toLowerCase();

		if (normalizedSearch) {
			result = result.filter((strategy) =>
				strategy.name.toLowerCase().includes(normalizedSearch),
			);
		}

		switch (statusFilter) {
			case 'active':
				result = result.filter((strategy) => strategy.isActive);
				break;

			case 'inactive':
				result = result.filter((strategy) => !strategy.isActive);
				break;
		}

		return [...result].sort((a, b) => {
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
	}, [
		strategies,
		searchQuery,
		sortOption,
		statusFilter,
	]);
}
