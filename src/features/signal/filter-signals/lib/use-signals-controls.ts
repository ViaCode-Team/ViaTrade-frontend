import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/hooks';

import type { DirectionFilter, SortOption } from '../model/signal-filters';

const defaultFilters = {
	q: '',
	sort: 'date-desc' as SortOption,
	direction: 'all' as DirectionFilter,
};

export function useSignalsControls() {
	const { filters: urlFilters, setFilter } = useUrlFilters(defaultFilters);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sortOption: urlFilters.sort,
			directionFilter: urlFilters.direction,
		}),
		[urlFilters.q, urlFilters.sort, urlFilters.direction],
	);

	return { filters, setFilter };
}
