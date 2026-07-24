import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/url-filters';
import { v } from '@/shared/lib/validation';

export const noteFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	page: v.fallback(v.string(), '1'),
	sourceFilter: v.fallback(
		v.picklist(['all', 'stock', 'strategy']),
		'all',
	),
});

export function useNotesControls() {
	const {
		filters: urlFilters,
		setFilters,
		resetFilters,
	} = useUrlFilters(noteFiltersSchema);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sourceFilter: urlFilters.sourceFilter,
			page: Math.max(Number(urlFilters.page) || 1, 1),
		}),
		[urlFilters.q, urlFilters.sourceFilter, urlFilters.page],
	);

	return { filters, setFilters, resetFilters };
}
