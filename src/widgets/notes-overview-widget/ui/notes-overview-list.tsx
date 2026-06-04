import type { NotesSourceFilter } from '@/features/note/filter-notes';

import { NotesList, NotesListSkeleton } from '@/entities/note';
import { getFilteredNotes } from '@/features/note/filter-notes';
import { NoteCard } from '@/features/note/manage-note';
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

	const displayNotes = getFilteredNotes({
		notes: allNotes,
		searchQuery,
		sourceFilter,
	});

	return (
		<NotesList
			notes={displayNotes}
			hasAnyNotes={allNotes.length > 0}
			noteSlot={(note) => (
				<NoteCard
					note={note}
					isSaving={isNoteSaving(note)}
					isDeleting={isNoteDeleting(note)}
					onSave={updateNote}
					onDelete={deleteNote}
				/>
			)}
		/>
	);
}

export const NotesOverviewListBoundary = withQueryBoundary(NotesOverviewList, {
	suspenseProps: {
		fallback: <NotesListSkeleton />,
	},
});
