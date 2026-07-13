import { NotesList, NotesListSkeleton } from '@/entities/note';
import { getFilteredNotes, useNotesControls } from '@/features/note/filter-notes';
import { NoteCard } from '@/features/note/manage-note';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useNotesMutations, usePersonalNotes } from '@/widgets/notes-overview';

export function DashboardNotes() {
	const { notes: allNotes } = usePersonalNotes();
	const { filters } = useNotesControls();
	const { isNoteSaving, isNoteDeleting, updateNote, deleteNote } = useNotesMutations();

	const displayNotes = getFilteredNotes({
		notes: allNotes,
		searchQuery: filters.searchQuery,
		sourceFilter: filters.sourceFilter,
	});

	const recentNotes = displayNotes.slice(0, 4);

	return (
		<DataState hasData={!!allNotes.length} hasResults={!!recentNotes.length}>
			<NotesList
				notes={recentNotes}
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

export const DashboardNotesBoundary = withQueryBoundary(DashboardNotes, {
	suspenseProps: {
		fallback: <NotesListSkeleton />,
	},
});
