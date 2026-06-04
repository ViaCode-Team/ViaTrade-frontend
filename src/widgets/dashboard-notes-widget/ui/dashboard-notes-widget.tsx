import { NotesList, NotesListSkeleton } from '@/entities/note';
import { getFilteredNotes, useNotesControls } from '@/features/note/filter-notes';
import { NoteCard } from '@/features/note/manage-note';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useNotesMutations, usePersonalNotes } from '@/widgets/notes-overview-widget';

export function DashboardNotesWidget() {
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
		<NotesList
			notes={recentNotes}
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

export const DashboardNotesWidgetBoundary = withQueryBoundary(DashboardNotesWidget, {
	suspenseProps: {
		fallback: <NotesListSkeleton />,
	},
});
