import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useNotesList } from '../lib/use-notes-list';
import { NotesList } from './notes-list';
import { NotesListSkeleton } from './notes-list.skeleton';

function NotesListWrapper() {
	const {
		filteredNotes,
		notes,
		isLoading,
		isSaving,
		isDeleting,
		updateNote,
		deleteNote,
	} = useNotesList();

	const hasNotes = notes.length > 0;

	return (
		<NotesList
			filteredNotes={filteredNotes}
			hasNotes={hasNotes}
			isLoading={isLoading}
			isSaving={isSaving}
			isDeleting={isDeleting}
			updateNote={updateNote}
			deleteNote={deleteNote}
		/>
	);
}

export const NotesListBoundary = withQueryBoundary(NotesListWrapper, {
	suspenseProps: {
		fallback: <NotesListSkeleton />,
	},
});
