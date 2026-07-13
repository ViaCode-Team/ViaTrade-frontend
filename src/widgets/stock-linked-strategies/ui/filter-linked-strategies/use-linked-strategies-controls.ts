import { useState } from 'react';

import type { LinkedStrategyFilters } from './linked-strategy-filters';

export function useLinkedStrategiesControls() {
	const [filters, setFilters] = useState<LinkedStrategyFilters>({
		searchQuery: '',
		sortOption: 'name-asc',
		statusFilter: 'all',
	});

	const [page, setPage] = useState(1);

	const setFilter = <K extends keyof LinkedStrategyFilters>(key: K, value: LinkedStrategyFilters[K]) => {
		setFilters((prev) => ({ ...prev, [key]: value }));
		setPage(1); // Reset page on filter change
	};

	return {
		filters,
		setFilter,
		page,
		setPage,
	};
}
