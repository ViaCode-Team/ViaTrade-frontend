import {
	useMutation,
	useQuery,
	useQueryClient,
} from '@tanstack/react-query';
import { useEffect } from 'react';

import type { NoteSource, StoredPersonalNote } from '@/entities/note';

import {
	deleteStoredPersonalNote,
	getStoredPersonalNotes,
	saveStoredPersonalNote,
	subscribeStoredPersonalNotes,
	upsertStoredPersonalNote,
} from '@/entities/note';
import { STATIC_QUERY_STALE_TIME } from '@/shared/model';

export const STORED_PERSONAL_NOTES_QUERY_KEY = ['stored-personal-notes'] as const;

export function getStoredPersonalNotesQueryOptions() {
	return {
		queryKey: STORED_PERSONAL_NOTES_QUERY_KEY,
		queryFn: getStoredPersonalNotes,
		initialData: getStoredPersonalNotes,
		staleTime: STATIC_QUERY_STALE_TIME,
	};
}

export function useStoredPersonalNotesQuery() {
	const queryClient = useQueryClient();
	const query = useQuery(getStoredPersonalNotesQueryOptions());

	useEffect(() => {
		return subscribeStoredPersonalNotes((notes) => {
			queryClient.setQueryData(STORED_PERSONAL_NOTES_QUERY_KEY, notes);
		});
	}, [queryClient]);

	return query;
}

export function useUpsertStoredPersonalNoteMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			note,
			text,
		}: {
			note: StoredPersonalNote;
			text: string;
		}) => upsertStoredPersonalNote(note, text),
		onSuccess: () => {
			queryClient.setQueryData(
				STORED_PERSONAL_NOTES_QUERY_KEY,
				getStoredPersonalNotes(),
			);
		},
	});
}

export function useSaveStoredPersonalNoteMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async ({
			source,
			text,
		}: {
			source: NoteSource;
			text: string;
		}) => saveStoredPersonalNote(source, text),
		onSuccess: () => {
			queryClient.setQueryData(
				STORED_PERSONAL_NOTES_QUERY_KEY,
				getStoredPersonalNotes(),
			);
		},
	});
}

export function useDeleteStoredPersonalNoteMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (noteId: string) => {
			deleteStoredPersonalNote(noteId);
		},
		onSuccess: () => {
			queryClient.setQueryData(
				STORED_PERSONAL_NOTES_QUERY_KEY,
				getStoredPersonalNotes(),
			);
		},
	});
}
