import { useState } from 'react';

import type { LinkedStrategyFilters } from './linked-strategy-filters';

export function useLinkedStrategiesControls() {
	const [filters, setFilters] = useState<LinkedStrategyFilters>({
		searchQuery: '',
		sortOption: 'name-asc',
		statusFilter: 'all',
	});

	const setFilter = <K extends keyof LinkedStrategyFilters>(key: K, value: LinkedStrategyFilters[K]) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
	};

	return {
		filters,
		setFilter,
	};
}
