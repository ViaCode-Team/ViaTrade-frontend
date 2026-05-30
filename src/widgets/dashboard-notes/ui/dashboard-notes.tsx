import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useNotesOverview } from '@/widgets/notes-overview/lib/use-notes-overview';
import { NotesList } from '@/widgets/notes-overview/ui/notes-list';
import { NotesListSkeleton } from '@/widgets/notes-overview/ui/notes-list.skeleton';

export function DashboardNotes() {
	const {
		filteredNotes,
		isSaving,
		isDeleting,
		updateNote,
		deleteNote,
	} = useNotesOverview();

	const recentNotes = filteredNotes.slice(0, 4);

	return (
		<NotesList
			filteredNotes={recentNotes}
			hasNotes={recentNotes.length > 0}
			isSaving={isSaving}
			isDeleting={isDeleting}
			updateNote={updateNote}
			deleteNote={deleteNote}
		/>
	);
}

export const DashboardNotesBoundary = withQueryBoundary(DashboardNotes, {
	suspenseProps: {
		fallback: <NotesListSkeleton />,
	},
});
