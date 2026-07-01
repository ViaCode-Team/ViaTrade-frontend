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
const EMPTY_STORED_PERSONAL_NOTES: StoredPersonalNote[] = [];

export function getStoredPersonalNotesQueryOptions() {
	return {
		queryKey: STORED_PERSONAL_NOTES_QUERY_KEY,
		queryFn: getStoredPersonalNotes,
		networkMode: 'always' as const,
		placeholderData: EMPTY_STORED_PERSONAL_NOTES,
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
		}) => {
			await upsertStoredPersonalNote(note, text);
			return await getStoredPersonalNotes();
		},
		onSuccess: (notes) => {
			queryClient.setQueryData(
				STORED_PERSONAL_NOTES_QUERY_KEY,
				notes,
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
		}) => {
			await saveStoredPersonalNote(source, text);
			return await getStoredPersonalNotes();
		},
		onSuccess: (notes) => {
			queryClient.setQueryData(
				STORED_PERSONAL_NOTES_QUERY_KEY,
				notes,
			);
		},
	});
}

export function useDeleteStoredPersonalNoteMutation() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (noteId: string) => {
			await deleteStoredPersonalNote(noteId);
			return await getStoredPersonalNotes();
		},
		onSuccess: (notes) => {
			queryClient.setQueryData(
				STORED_PERSONAL_NOTES_QUERY_KEY,
				notes,
			);
		},
	});
}
