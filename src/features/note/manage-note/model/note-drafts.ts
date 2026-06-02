import type { StoredPersonalNote } from '@/entities/note';

export type DraftedPersonalNote = StoredPersonalNote & {
	apiText: string;
	hasLocalDraft: boolean;
	isLocalOnly: boolean;
};

export function mergeApiNotesWithDrafts({
	apiNotes,
	storedNotes,
}: {
	apiNotes: StoredPersonalNote[];
	storedNotes: StoredPersonalNote[];
}): DraftedPersonalNote[] {
	const storedNotesById = new Map(storedNotes.map((note) => [note.id, note]));
	const mappedIds = new Set<string>();

	const mergedApiNotes = apiNotes.map((apiNote) => {
		const storedNote = storedNotesById.get(apiNote.id);

		if (storedNote) {
			mappedIds.add(apiNote.id);
		}

		return {
			...apiNote,
			apiText: apiNote.text,
			text: storedNote?.text ?? apiNote.text,
			hasLocalDraft: Boolean(storedNote),
			isLocalOnly: false,
		};
	});

	const unmappedStoredNotes = storedNotes
		.filter((note) => !mappedIds.has(note.id))
		.map((note) => ({
			...note,
			apiText: '',
			hasLocalDraft: true,
			isLocalOnly: true,
		}));

	return [...mergedApiNotes, ...unmappedStoredNotes];
}

export function getApiSourceId(sourceId: string | undefined) {
	const value = Number(sourceId);

	return Number.isInteger(value) && value > 0 ? value : null;
}
