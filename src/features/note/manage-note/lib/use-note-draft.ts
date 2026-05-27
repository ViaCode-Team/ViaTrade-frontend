import {
	useEffect,
	useRef,
	useState,
} from 'react';

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
	const saveDraftTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const pendingDraftRef = useRef<PendingDraft | null>(null);
	const upsertStoredNoteMutation = useUpsertStoredPersonalNoteMutation();
	const deleteStoredNoteMutation = useDeleteStoredPersonalNoteMutation();
	const draftValue = localDraft.noteId === note.id && localDraft.isDirty
		? localDraft.text
		: value;

	useEffect(() => {
		return () => {
			clearDraftSaveTimeout();
			flushPendingDraftToStorage();
		};
	}, []);

	function clearDraftSaveTimeout() {
		if (saveDraftTimeoutRef.current) {
			clearTimeout(saveDraftTimeoutRef.current);
			saveDraftTimeoutRef.current = null;
		}
	}

	function flushPendingDraftToStorage() {
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
	}

	function saveLocalDraft() {
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
	}

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
		clearDraftSaveTimeout();
		saveDraftTimeoutRef.current = setTimeout(saveLocalDraft, saveDelay);
	}

	function confirmSaved(nextValue: string) {
		clearDraftSaveTimeout();
		pendingDraftRef.current = null;
		setLocalDraft({
			noteId: note.id,
			text: nextValue,
			isDirty: false,
		});
		deleteStoredNoteMutation.mutate(note.id);
	}

	function discardDraft() {
		clearDraftSaveTimeout();
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
