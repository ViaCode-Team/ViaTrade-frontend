import type {
	NoteSourceType,
	StoredPersonalNote,
} from '@/entities/note';

export type NotesSourceFilter = 'all' | NoteSourceType;

type GetFilteredNotesOptions<Note extends StoredPersonalNote> = {
	notes: Note[];
	searchQuery: string;
	sourceFilter: NotesSourceFilter;
};

export function getFilteredNotes<Note extends StoredPersonalNote>({
	notes,
	searchQuery,
	sourceFilter,
}: GetFilteredNotesOptions<Note>) {
	const normalizedQuery = searchQuery.trim().toLowerCase();

	return notes.filter((note) => {
		const matchesSource = sourceFilter === 'all' || note.source.type === sourceFilter;

		if (!matchesSource) {
			return false;
		}

		if (!normalizedQuery) {
			return true;
		}

		const searchableValues = [
			note.text,
			note.source.label,
			note.source.description ?? '',
		];

		return searchableValues
			.some((value) => value.toLowerCase().includes(normalizedQuery));
	});
}

export function getNotesSummary(notes: StoredPersonalNote[]) {
	return {
		total: notes.length,
		stock: notes.filter((note) => note.source.type === 'stock').length,
		strategy: notes.filter((note) => note.source.type === 'strategy').length,
	};
}
