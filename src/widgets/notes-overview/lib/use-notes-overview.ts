import { useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import {
	useDeleteInstrumentNote,
	useDeleteStrategyNote,
	useGetByUserInstrumentAll,
	useGetByUserStrategyAll,
	useUpdateInstrumentNote,
	useUpdateStrategyNote,
} from '@/entities/note';
import { useGetAll as useGetAllStrategies } from '@/entities/strategy/api/gen';
import { useGetAllStocksCodes } from '@/entities/trade-code/api/gen';
import { mapTradeCodeToStock } from '@/entities/trade-code/stock';
import { useStoredPersonalNotesQuery } from '@/features/note/manage-note';

import type { NotesSourceFilter } from '../model/note-filters';

import {
	deleteApiNoteFromCache,
	setApiNoteTextInCache,
} from '../model/api-note-cache';
import { getApiPersonalNotes } from '../model/api-notes';
import {
	type DraftedPersonalNote,
	getApiSourceId,
	mergeApiNotesWithDrafts,
} from '../model/note-drafts';
import {
	getFilteredNotes,
	getNotesSummary,
} from '../model/note-filters';

export function useNotesOverview() {
	const queryClient = useQueryClient();
	const [searchQuery, setSearchQuery] = useState('');
	const [sourceFilter, setSourceFilter] = useState<NotesSourceFilter>('all');

	const storedNotesQuery = useStoredPersonalNotesQuery();
	const instrumentNotesQuery = useGetByUserInstrumentAll();
	const strategyNotesQuery = useGetByUserStrategyAll();

	const stocksQuery = useGetAllStocksCodes();
	const strategiesQuery = useGetAllStrategies();

	const updateInstrumentNoteMutation = useUpdateInstrumentNote();
	const updateStrategyNoteMutation = useUpdateStrategyNote();
	const deleteInstrumentNoteMutation = useDeleteInstrumentNote();
	const deleteStrategyNoteMutation = useDeleteStrategyNote();

	const apiNotes = useMemo(
		() => getApiPersonalNotes({
			instrumentNotes: instrumentNotesQuery.data?.data ?? [],
			strategyNotes: strategyNotesQuery.data?.data ?? [],
			stocks: (stocksQuery.data?.data ?? []).map(mapTradeCodeToStock),
			strategies: strategiesQuery.data?.data ?? [],
		}),
		[
			instrumentNotesQuery.data?.data,
			strategyNotesQuery.data?.data,
			stocksQuery.data?.data,
			strategiesQuery.data?.data,
		],
	);

	const notes = useMemo(
		() => mergeApiNotesWithDrafts({
			apiNotes,
			storedNotes: storedNotesQuery.data ?? [],
		}),
		[apiNotes, storedNotesQuery.data],
	);

	const filteredNotes = useMemo(
		() => getFilteredNotes({ notes, searchQuery, sourceFilter }),
		[notes, searchQuery, sourceFilter],
	);

	const summary = useMemo(() => getNotesSummary(notes), [notes]);

	const isLoading = instrumentNotesQuery.isLoading
		|| strategyNotesQuery.isLoading
		|| stocksQuery.isLoading
		|| strategiesQuery.isLoading;

	const hasError = instrumentNotesQuery.isError
		|| strategyNotesQuery.isError
		|| stocksQuery.isError
		|| strategiesQuery.isError
		|| updateInstrumentNoteMutation.isError
		|| updateStrategyNoteMutation.isError
		|| deleteInstrumentNoteMutation.isError
		|| deleteStrategyNoteMutation.isError;
	const isSaving = updateInstrumentNoteMutation.isPending
		|| updateStrategyNoteMutation.isPending;
	const isDeleting = deleteInstrumentNoteMutation.isPending
		|| deleteStrategyNoteMutation.isPending;

	function updateNote(
		note: DraftedPersonalNote,
		text: string,
		onSuccess: () => void,
	) {
		const sourceId = getApiSourceId(note.source.id);

		if (sourceId === null) {
			return;
		}

		const data = { noteText: text };
		const mutationOptions = {
			onSuccess: () => {
				setApiNoteTextInCache({ queryClient, note, text });
				onSuccess();
			},
		};

		if (note.source.type === 'stock') {
			updateInstrumentNoteMutation.mutate(
				{ idInstrument: sourceId, data },
				mutationOptions,
			);
			return;
		}

		updateStrategyNoteMutation.mutate(
			{ idStrategy: sourceId, data },
			mutationOptions,
		);
	}

	function deleteNote(note: DraftedPersonalNote, onSuccess: () => void) {
		const sourceId = getApiSourceId(note.source.id);

		if (sourceId === null) {
			return;
		}

		if (note.source.type === 'stock') {
			deleteInstrumentNoteMutation.mutate(
				{ idInstrument: sourceId },
				{
					onSuccess: () => {
						deleteApiNoteFromCache({ queryClient, note });
						onSuccess();
					},
				},
			);
			return;
		}

		deleteStrategyNoteMutation.mutate(
			{ idStrategy: sourceId },
			{
				onSuccess: () => {
					deleteApiNoteFromCache({ queryClient, note });
					onSuccess();
				},
			},
		);
	}

	return {
		notes,
		filteredNotes,
		summary,
		isLoading,
		hasError,
		isSaving,
		isDeleting,
		searchQuery,
		sourceFilter,
		setSearchQuery,
		setSourceFilter,
		updateNote,
		deleteNote,
	};
}
