import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { NotesList, NotesListSkeleton, useNotesList } from '@/widgets/notes-list';

export function DashboardNotes() {
	const {
		filteredNotes,
		isSaving,
		isDeleting,
		updateNote,
		deleteNote,
	} = useNotesList();

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
