import { createStorageKey } from '@/shared/lib/storage-key';

import type {
	NoteSource,
	StoredPersonalNote,
} from './note';

import {
	createPersonalNote,
	getNoteId,
} from './note';

const PERSONAL_NOTES_STORAGE_KEY = createStorageKey('notes', 'personal');
const PERSONAL_NOTES_UPDATE_EVENT = createStorageKey('notes', 'personal', 'update');
const EMPTY_PERSONAL_NOTES: StoredPersonalNote[] = [];

let cachedRawPersonalNotes: string | null = null;
let cachedPersonalNotes: StoredPersonalNote[] = EMPTY_PERSONAL_NOTES;

type PersonalNotesStorageEvent = CustomEvent<StoredPersonalNote[]>;

export function getStoredPersonalNotes() {
	if (!canUseLocalStorage()) {
		return EMPTY_PERSONAL_NOTES;
	}

	const rawValue = window.localStorage.getItem(PERSONAL_NOTES_STORAGE_KEY);

	if (!rawValue) {
		cachedRawPersonalNotes = null;
		cachedPersonalNotes = EMPTY_PERSONAL_NOTES;

		return cachedPersonalNotes;
	}

	if (cachedRawPersonalNotes === rawValue) {
		return cachedPersonalNotes;
	}

	try {
		const parsedValue: unknown = JSON.parse(rawValue);

		if (!Array.isArray(parsedValue)) {
			cachedRawPersonalNotes = rawValue;
			cachedPersonalNotes = EMPTY_PERSONAL_NOTES;

			return cachedPersonalNotes;
		}

		cachedRawPersonalNotes = rawValue;
		cachedPersonalNotes = parsedValue.filter(isStoredPersonalNote);

		return cachedPersonalNotes;
	}
	catch {
		cachedRawPersonalNotes = rawValue;
		cachedPersonalNotes = EMPTY_PERSONAL_NOTES;

		return cachedPersonalNotes;
	}
}

export function getStoredPersonalNote(source: NoteSource) {
	const noteId = getNoteId(source);

	return getStoredPersonalNotes().find((note) => note.id === noteId) ?? null;
}

export function saveStoredPersonalNote(source: NoteSource, text: string) {
	const notes = getStoredPersonalNotes();
	const nextNoteData = createPersonalNote({ text });
	const nextNote: StoredPersonalNote = {
		id: getNoteId(source),
		source,
		text: nextNoteData.text,
	};

	writeStoredPersonalNotes([
		nextNote,
		...notes.filter((note) => note.id !== nextNote.id),
	]);

	return nextNote;
}

export function updateStoredPersonalNote(noteId: string, text: string) {
	const notes = getStoredPersonalNotes();
	const note = notes.find((currentNote) => currentNote.id === noteId);

	if (!note) {
		return null;
	}

	const nextNoteData = createPersonalNote({ text });
	const nextNote: StoredPersonalNote = {
		...note,
		text: nextNoteData.text,
	};

	writeStoredPersonalNotes([
		nextNote,
		...notes.filter((currentNote) => currentNote.id !== noteId),
	]);

	return nextNote;
}

export function upsertStoredPersonalNote(note: StoredPersonalNote, text: string) {
	const notes = getStoredPersonalNotes();
	const nextNoteData = createPersonalNote({ text });
	const nextNote: StoredPersonalNote = {
		id: note.id,
		source: note.source,
		text: nextNoteData.text,
	};

	writeStoredPersonalNotes([
		nextNote,
		...notes.filter((currentNote) => currentNote.id !== note.id),
	]);

	return nextNote;
}

export function deleteStoredPersonalNote(noteId: string) {
	const notes = getStoredPersonalNotes();
	const nextNotes = notes.filter((note) => note.id !== noteId);

	writeStoredPersonalNotes(nextNotes);
}

export function subscribeStoredPersonalNotes(
	callback: (notes: StoredPersonalNote[]) => void,
) {
	if (!canUseLocalStorage()) {
		return () => {};
	}

	const handleCustomUpdate = (event: Event) => {
		callback((event as PersonalNotesStorageEvent).detail);
	};

	const handleStorageUpdate = (event: StorageEvent) => {
		if (event.key === PERSONAL_NOTES_STORAGE_KEY) {
			callback(getStoredPersonalNotes());
		}
	};

	window.addEventListener(PERSONAL_NOTES_UPDATE_EVENT, handleCustomUpdate);
	window.addEventListener('storage', handleStorageUpdate);

	return () => {
		window.removeEventListener(PERSONAL_NOTES_UPDATE_EVENT, handleCustomUpdate);
		window.removeEventListener('storage', handleStorageUpdate);
	};
}

function writeStoredPersonalNotes(notes: StoredPersonalNote[]) {
	if (!canUseLocalStorage()) {
		return;
	}

	const rawValue = JSON.stringify(notes);

	cachedRawPersonalNotes = rawValue;
	cachedPersonalNotes = notes;

	window.localStorage.setItem(PERSONAL_NOTES_STORAGE_KEY, rawValue);
	window.dispatchEvent(
		new CustomEvent(PERSONAL_NOTES_UPDATE_EVENT, {
			detail: notes,
		}),
	);
}

function canUseLocalStorage() {
	return typeof window !== 'undefined' && 'localStorage' in window;
}

function isStoredPersonalNote(value: unknown): value is StoredPersonalNote {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const note = value as Partial<StoredPersonalNote>;

	return (
		typeof note.id === 'string'
		&& typeof note.text === 'string'
		&& isNoteSource(note.source)
	);
}

function isNoteSource(value: unknown): value is NoteSource {
	if (!value || typeof value !== 'object') {
		return false;
	}

	const source = value as Partial<NoteSource>;

	return (
		(source.type === 'stock' || source.type === 'strategy')
		&& typeof source.id === 'string'
		&& typeof source.label === 'string'
		&& typeof source.path === 'string'
	);
}
