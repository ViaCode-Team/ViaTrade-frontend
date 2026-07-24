import { useState } from 'react';

import type { LinkedStrategyFilters } from './linked-strategy-filters';

const DEFAULT_FILTERS: LinkedStrategyFilters = {
	searchQuery: '',
	sortOption: 'name-asc',
	statusFilter: 'all',
};

export function useLinkedStrategiesControls() {
	const [filters, setFilters] = useState<LinkedStrategyFilters>(DEFAULT_FILTERS);

	const setFilter = <K extends keyof LinkedStrategyFilters>(key: K, value: LinkedStrategyFilters[K]) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	return {
		filters,
		setFilter,
		resetFilters: () => setFilters(DEFAULT_FILTERS),
	};
}
