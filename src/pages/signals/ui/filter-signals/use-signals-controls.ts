import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/url-filters';
import { v } from '@/shared/lib/validation';

import type { DirectionFilter, SortOption } from './signal-filters';

export const signalFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	listSort: v.fallback(
		v.picklist(['date-desc', 'date-asc', 'asset-asc', 'asset-desc', 'confidence-desc', 'confidence-asc']),
		'date-desc',
	),
	directionFilter: v.fallback(
		v.picklist(['all', 'buy', 'sell']),
		'all',
	),
});

export function useSignalsControls() {
	const {
		filters: urlFilters,
		setFilter,
		resetFilters,
	} = useUrlFilters(signalFiltersSchema);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sortOption: urlFilters.listSort as SortOption,
			directionFilter: urlFilters.directionFilter as DirectionFilter,
		}),
		[urlFilters.q, urlFilters.listSort, urlFilters.directionFilter],
	);

	return { filters, setFilter, resetFilters };
}
