import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/url-filters';
import { v } from '@/shared/lib/validation';

import type { SignalTypeFilter, SortOption } from './signal-filters';

export const signalFiltersSchema = v.object({
	listSort: v.fallback(
		v.picklist(['date-desc', 'date-asc', 'asset-asc', 'asset-desc', 'confidence-desc', 'confidence-asc']),
		'date-desc',
	),
	signalsFilter: v.fallback(
		v.pipe(
			v.union([v.string(), v.array(v.picklist(['buy', 'sell', 'hold']))]),
			v.transform((input) => {
				if (typeof input === 'string') {
					return input === '' ? [] : input.split(',');
				}
				return input;
			}),
			v.array(v.picklist(['buy', 'sell', 'hold'])),
		),
		['buy', 'sell', 'hold'],
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
			signalsFilter: urlFilters.signalsFilter as SignalTypeFilter[],
			page: urlFilters.page,
		}),
		[urlFilters.listSort, urlFilters.signalsFilter, urlFilters.page],
	);

	return {
		filters,
		resetFilters,
		setPage: (page: number) => setFilter('page', page),
		setSortOption: (sortOption: SortOption) => setFilters({ listSort: sortOption, page: 1 }),
		setSignalsFilter: (signalsFilter: SignalTypeFilter[]) => setFilters({ signalsFilter, page: 1 }),
	};
}
