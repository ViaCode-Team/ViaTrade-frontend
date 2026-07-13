import type { NotesSourceFilter } from '@/features/note/filter-notes';

import { NotesList, NotesListSkeleton } from '@/entities/note';
import { getFilteredNotes } from '@/features/note/filter-notes';
import { NoteCard } from '@/features/note/manage-note';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useNotesMutations } from '../lib/hooks/use-notes-mutations';
import { usePersonalNotes } from '../lib/hooks/use-personal-notes';

export type NotesOverviewListProps = {
	searchQuery: string;
	sourceFilter: NotesSourceFilter;
};

function NotesOverviewList({ searchQuery, sourceFilter }: NotesOverviewListProps) {
	const { notes: allNotes } = usePersonalNotes();
	const { isNoteSaving, isNoteDeleting, updateNote, deleteNote } = useNotesMutations();

	const resultNotes = getFilteredNotes({
		notes: allNotes,
		searchQuery,
		sourceFilter,
	});

	return (
		<DataState hasData={!!allNotes.length} hasResults={!!resultNotes.length}>
			<NotesList
				notes={resultNotes}
				renderNote={(note) => (
					<NoteCard
						note={note}
						isSaving={isNoteSaving(note)}
						isDeleting={isNoteDeleting(note)}
						onSave={updateNote}
						onDelete={deleteNote}
					/>
				)}
			/>
		</DataState>
	);
}

export const NotesOverviewListBoundary = withQueryBoundary(NotesOverviewList, {
	suspenseProps: {
		fallback: <NotesListSkeleton />,
	},
});
