import { isAppLocked, secureGetItem, secureSetItem } from '@/shared/lib/secure-storage';
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

export async function getStoredPersonalNotes() {
	const rawValue = await getEncryptedPersonalNotes();

	if (!rawValue) {
		cachedRawPersonalNotes = null;
		cachedPersonalNotes = EMPTY_PERSONAL_NOTES;

		return cachedPersonalNotes;
	}

	if (cachedRawPersonalNotes === rawValue) {
		return cachedPersonalNotes;
	}

	return parseAndCachePersonalNotes(rawValue);
}

export async function getStoredPersonalNote(source: NoteSource) {
	const noteId = getNoteId(source);
	const notes = await getStoredPersonalNotes();

	return notes.find((note) => note.id === noteId) ?? null;
}

export async function saveStoredPersonalNote(source: NoteSource, text: string) {
	const notes = await getStoredPersonalNotes();
	const nextNoteData = createPersonalNote({ text });
	const nextNote: StoredPersonalNote = {
		id: getNoteId(source),
		source,
		text: nextNoteData.text,
	};

	await writeStoredPersonalNotes([
		nextNote,
		...notes.filter((note) => note.id !== nextNote.id),
	]);

	return nextNote;
}

export async function updateStoredPersonalNote(noteId: string, text: string) {
	const notes = await getStoredPersonalNotes();
	const note = notes.find((currentNote) => currentNote.id === noteId);

	if (!note) {
		return null;
	}

	const nextNoteData = createPersonalNote({ text });
	const nextNote: StoredPersonalNote = {
		...note,
		text: nextNoteData.text,
	};

	await writeStoredPersonalNotes([
		nextNote,
		...notes.filter((currentNote) => currentNote.id !== noteId),
	]);

	return nextNote;
}

export async function upsertStoredPersonalNote(note: StoredPersonalNote, text: string) {
	const notes = await getStoredPersonalNotes();
	const nextNoteData = createPersonalNote({ text });
	const nextNote: StoredPersonalNote = {
		id: note.id,
		source: note.source,
		text: nextNoteData.text,
	};

	await writeStoredPersonalNotes([
		nextNote,
		...notes.filter((currentNote) => currentNote.id !== note.id),
	]);

	return nextNote;
}

export async function deleteStoredPersonalNote(noteId: string) {
	const notes = await getStoredPersonalNotes();
	const nextNotes = notes.filter((note) => note.id !== noteId);

	await writeStoredPersonalNotes(nextNotes);
}

export function subscribeStoredPersonalNotes(
	callback: (notes: StoredPersonalNote[]) => void,
) {
	if (typeof window === 'undefined') {
		return () => {};
	}

	const handleCustomUpdate = (event: Event) => {
		callback((event as PersonalNotesStorageEvent).detail);
	};

	const handleLegacyStorageUpdate = (event: StorageEvent) => {
		if (event.key === PERSONAL_NOTES_STORAGE_KEY) {
			void getStoredPersonalNotes().then(callback);
		}
	};

	window.addEventListener(PERSONAL_NOTES_UPDATE_EVENT, handleCustomUpdate);
	window.addEventListener('storage', handleLegacyStorageUpdate);

	return () => {
		window.removeEventListener(PERSONAL_NOTES_UPDATE_EVENT, handleCustomUpdate);
		window.removeEventListener('storage', handleLegacyStorageUpdate);
	};
}

async function getEncryptedPersonalNotes() {
	const encryptedValue = await secureGetItem(PERSONAL_NOTES_STORAGE_KEY);

	if (encryptedValue) {
		removeLegacyPersonalNotes();
		return encryptedValue;
	}

	if (isAppLocked()) {
		return null;
	}

	const legacyValue = getLegacyPersonalNotes();
	if (!legacyValue) {
		return null;
	}

	const notes = parsePersonalNotes(legacyValue);
	const normalizedValue = JSON.stringify(notes);

	await secureSetItem(PERSONAL_NOTES_STORAGE_KEY, normalizedValue);
	removeLegacyPersonalNotes();

	return normalizedValue;
}

async function writeStoredPersonalNotes(notes: StoredPersonalNote[]) {
	const rawValue = JSON.stringify(notes);

	cachedRawPersonalNotes = rawValue;
	cachedPersonalNotes = notes;

	await secureSetItem(PERSONAL_NOTES_STORAGE_KEY, rawValue);
	removeLegacyPersonalNotes();
	dispatchStoredPersonalNotesUpdate(notes);
}

function dispatchStoredPersonalNotesUpdate(notes: StoredPersonalNote[]) {
	if (typeof window === 'undefined') {
		return;
	}

	window.dispatchEvent(
		new CustomEvent(PERSONAL_NOTES_UPDATE_EVENT, {
			detail: notes,
		}),
	);
}

function getLegacyPersonalNotes() {
	if (!canUseLocalStorage()) {
		return null;
	}

	return window.localStorage.getItem(PERSONAL_NOTES_STORAGE_KEY);
}

function removeLegacyPersonalNotes() {
	if (!canUseLocalStorage()) {
		return;
	}

	window.localStorage.removeItem(PERSONAL_NOTES_STORAGE_KEY);
}

function parseAndCachePersonalNotes(rawValue: string) {
	cachedRawPersonalNotes = rawValue;
	cachedPersonalNotes = parsePersonalNotes(rawValue);

	return cachedPersonalNotes;
}

function parsePersonalNotes(rawValue: string) {
	try {
		const parsedValue: unknown = JSON.parse(rawValue);

		if (!Array.isArray(parsedValue)) {
			return EMPTY_PERSONAL_NOTES;
		}

		return parsedValue.filter(isStoredPersonalNote);
	}
	catch {
		return EMPTY_PERSONAL_NOTES;
	}
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
