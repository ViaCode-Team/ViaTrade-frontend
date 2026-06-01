import { useDebouncedCallback } from '@mantine/hooks';
import { useEffect, useRef, useState } from 'react';

import type { StoredPersonalNote } from '@/entities/note';

import {
	deleteStoredPersonalNote,
	upsertStoredPersonalNote,
} from '@/entities/note';

import {
	useDeleteStoredPersonalNoteMutation,
	useUpsertStoredPersonalNoteMutation,
} from './use-stored-personal-notes';

const DEFAULT_NOTE_DRAFT_SAVE_DELAY = 600;

type PendingDraft = {
	note: StoredPersonalNote;
	savedValue: string;
	text: string;
};

type UseNoteDraftOptions = {
	note: StoredPersonalNote;
	value: string;
	savedValue: string;
	saveDelay?: number;
};

export function useNoteDraft({
	note,
	value,
	savedValue,
	saveDelay = DEFAULT_NOTE_DRAFT_SAVE_DELAY,
}: UseNoteDraftOptions) {
	const [localDraft, setLocalDraft] = useState(() => ({
		noteId: note.id,
		text: value,
		isDirty: false,
	}));
	const pendingDraftRef = useRef<PendingDraft | null>(null);
	const upsertStoredNoteMutation = useUpsertStoredPersonalNoteMutation();
	const deleteStoredNoteMutation = useDeleteStoredPersonalNoteMutation();

	const draftValue = localDraft.noteId === note.id && localDraft.isDirty
		? localDraft.text
		: value;

	const saveLocalDraft = useDebouncedCallback(() => {
		if (!pendingDraftRef.current) {
			return;
		}

		const { note, savedValue, text } = pendingDraftRef.current;
		pendingDraftRef.current = null;

		if (isSameNoteText(text, savedValue)) {
			deleteStoredNoteMutation.mutate(note.id);
			return;
		}

		upsertStoredNoteMutation.mutate({
			note,
			text,
		});
	}, saveDelay);

	useEffect(() => {
		return () => {
			// Cancel pending React Query mutation timeouts
			saveLocalDraft.cancel?.();

			// Flush synchronously to storage
			if (!pendingDraftRef.current) {
				return;
			}

			const { note, savedValue, text } = pendingDraftRef.current;
			pendingDraftRef.current = null;

			if (isSameNoteText(text, savedValue)) {
				deleteStoredPersonalNote(note.id);
				return;
			}

			upsertStoredPersonalNote(note, text);
		};
	}, [saveLocalDraft]);

	function changeDraftValue(nextValue: string) {
		setLocalDraft({
			noteId: note.id,
			text: nextValue,
			isDirty: true,
		});
		pendingDraftRef.current = {
			note,
			savedValue,
			text: nextValue,
		};
		saveLocalDraft();
	}

	function confirmSaved(nextValue: string) {
		saveLocalDraft.cancel?.();
		pendingDraftRef.current = null;
		setLocalDraft({
			noteId: note.id,
			text: nextValue,
			isDirty: false,
		});
		deleteStoredNoteMutation.mutate(note.id);
	}

	function discardDraft() {
		saveLocalDraft.cancel?.();
		pendingDraftRef.current = null;
		deleteStoredNoteMutation.mutate(note.id);
	}

	return {
		value: draftValue,
		onValueChange: changeDraftValue,
		confirmSaved,
		discardDraft,
	};
}

function isSameNoteText(firstText: string, secondText: string) {
	return firstText.trim() === secondText.trim();
}
