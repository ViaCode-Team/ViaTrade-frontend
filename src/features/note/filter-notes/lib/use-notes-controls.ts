import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/hooks';
import { v } from '@/shared/model/validate';

export const noteFiltersSchema = v.object({
	q: v.fallback(v.string(), ''),
	sourceFilter: v.fallback(
		v.picklist(['all', 'stock', 'strategy']),
		'all',
	),
});

export function useNotesControls() {
	const { filters: urlFilters, setFilter } = useUrlFilters(noteFiltersSchema);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sourceFilter: urlFilters.sourceFilter,
		}),
		[urlFilters.q, urlFilters.sourceFilter],
	);

	return { filters, setFilter };
}
