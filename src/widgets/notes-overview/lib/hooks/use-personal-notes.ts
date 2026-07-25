import { useMemo } from 'react';

import {
	useGetUserNotesSuspense,
} from '@/entities/note';
import { useNotesControls } from '@/features/note/filter-notes';
import { mergeApiNotesWithDrafts, useStoredPersonalNotesQuery } from '@/features/note/manage-note';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

import { getApiPersonalNotes } from '../../model/api-notes';

export const NOTES_PAGE_SIZE = 12;

export function usePersonalNotes() {
	const storedNotesQuery = useStoredPersonalNotesQuery();
	const { filters, setFilters } = useNotesControls();
	const notesQuery = useGetUserNotesSuspense({ page: filters.page, pageSize: NOTES_PAGE_SIZE }, { query: { refetchInterval: QUERY_REFETCH_INTERVAL } });

	const apiNotes = useMemo(
		() => getApiPersonalNotes({
			instrumentNotes: notesQuery.data.data.items.filter((note) => note.tradeCode !== undefined),
			strategyNotes: notesQuery.data.data.items.filter((note) => note.strategy !== undefined),
		}),
		[notesQuery.data.data.items],
	);

	const notes = useMemo(() => mergeApiNotesWithDrafts({ apiNotes, storedNotes: storedNotesQuery.data ?? [] }), [apiNotes, storedNotesQuery.data]);

	return {
		notes,
		apiNotes,
		refetch: notesQuery.refetch,
		totalCount: notesQuery.data.data.totalCount,
		totalPages: notesQuery.data.data.totalPages,
		page: notesQuery.data.data.page,
		setPage: (page: number) => setFilters({ page: String(page) }),
	};
}
