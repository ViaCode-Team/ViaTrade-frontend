import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import {
	NotesList,
	NotesListSkeleton,
	usePersonalNotes,
} from '@/widgets/notes-list';

export function DashboardNotes() {
	const { notes } = usePersonalNotes();
	const recentNotes = notes.slice(0, 4);

	return <NotesList notes={recentNotes} />;
}

export const DashboardNotesBoundary = withQueryBoundary(DashboardNotes, {
	suspenseProps: {
		fallback: <NotesListSkeleton />,
	},
});
