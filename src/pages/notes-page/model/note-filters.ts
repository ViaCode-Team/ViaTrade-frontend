import type {
	NoteSourceType,
	StoredPersonalNote,
} from '@/entities/note';

export type NotesSourceFilter = 'all' | NoteSourceType;
export type NotesSortOption = 'updated-desc' | 'updated-asc';

type GetFilteredNotesOptions = {
	notes: StoredPersonalNote[];
	searchQuery: string;
	sourceFilter: NotesSourceFilter;
	sortOption: NotesSortOption;
};

export function getFilteredNotes({
	notes,
	searchQuery,
	sourceFilter,
	sortOption,
}: GetFilteredNotesOptions) {
	const normalizedQuery = searchQuery.trim().toLowerCase();

	return notes
		.filter((note) => {
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
		})
		.sort((firstNote, secondNote) => {
			const firstTime = new Date(firstNote.updatedAt).getTime();
			const secondTime = new Date(secondNote.updatedAt).getTime();

			return sortOption === 'updated-desc'
				? secondTime - firstTime
				: firstTime - secondTime;
		});
}

export function getNotesSummary(notes: StoredPersonalNote[]) {
	return {
		total: notes.length,
		stock: notes.filter((note) => note.source.type === 'stock').length,
		strategy: notes.filter((note) => note.source.type === 'strategy').length,
	};
}
