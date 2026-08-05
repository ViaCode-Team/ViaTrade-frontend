import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/url-filters';
import { v } from '@/shared/lib/validation';

import type { DirectionFilter, SortOption } from './signal-filters';

export const signalFiltersSchema = v.object({
	listSort: v.fallback(
		v.picklist(['date-desc', 'date-asc', 'asset-asc', 'asset-desc', 'confidence-desc', 'confidence-asc']),
		'date-desc',
	),
	directionFilter: v.fallback(
		v.picklist(['all', 'buy', 'sell']),
		'all',
	),
	page: v.fallback(v.pipe(v.string(), v.transform(Number), v.integer(), v.minValue(1)), 1),
});

export function useSignalsControls() {
	const {
		filters: urlFilters,
		setFilter,
		setFilters,
		resetFilters,
	} = useUrlFilters(signalFiltersSchema);

	const filters = useMemo(
		() => ({
			sortOption: urlFilters.listSort as SortOption,
			directionFilter: urlFilters.directionFilter as DirectionFilter,
			page: urlFilters.page,
		}),
		[urlFilters.listSort, urlFilters.directionFilter, urlFilters.page],
	);

	return {
		filters,
		resetFilters,
		setPage: (page: number) => setFilter('page', page),
		setSortOption: (sortOption: SortOption) => setFilters({ listSort: sortOption, page: 1 }),
		setDirectionFilter: (directionFilter: DirectionFilter) => setFilters({ directionFilter, page: 1 }),
	};
}
