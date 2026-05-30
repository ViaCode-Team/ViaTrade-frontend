import { useMemo } from 'react';

import { useUrlFilters } from '@/shared/lib/hooks';

import type { NotesSourceFilter } from '../model/note-filters';

const defaultFilters = {
	q: '',
	source: 'all' as NotesSourceFilter,
};

export function useNotesControls() {
	const { filters: urlFilters, setFilter } = useUrlFilters(defaultFilters);

	const filters = useMemo(
		() => ({
			searchQuery: urlFilters.q,
			sourceFilter: urlFilters.source,
		}),
		[urlFilters.q, urlFilters.source],
	);

	return { filters, setFilter };
}
