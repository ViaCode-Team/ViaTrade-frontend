import type { StoredPersonalNote } from '@/entities/note';

export type DraftedPersonalNote = StoredPersonalNote & {
	apiText: string;
	hasLocalDraft: boolean;
};

export function mergeApiNotesWithDrafts({
	apiNotes,
	storedNotes,
}: {
	apiNotes: StoredPersonalNote[];
	storedNotes: StoredPersonalNote[];
}): DraftedPersonalNote[] {
	const storedNotesById = new Map(storedNotes.map((note) => [note.id, note]));

	return apiNotes.map((apiNote) => {
		const storedNote = storedNotesById.get(apiNote.id);

		return {
			...apiNote,
			apiText: apiNote.text,
			text: storedNote?.text ?? apiNote.text,
			hasLocalDraft: Boolean(storedNote),
		};
	});
}

export function getApiSourceId(sourceId: string | undefined) {
	const value = Number(sourceId);

	return Number.isInteger(value) && value > 0 ? value : null;
}
