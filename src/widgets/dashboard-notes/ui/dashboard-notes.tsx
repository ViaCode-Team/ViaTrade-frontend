import { Flex } from '@mantine/core';

import { NoteCard } from '@/features/note/manage-note';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useNotesOverview } from '@/widgets/notes-overview/lib/use-notes-overview';

import { DashboardNotesSkeleton } from './dashboard-notes.skeleton';

export function DashboardNotes() {
	const {
		filteredNotes,
		isSaving,
		isDeleting,
		updateNote,
		deleteNote,
	} = useNotesOverview();

	const recentNotes = filteredNotes.slice(0, 4);

	if (recentNotes.length === 0) {
		return <EmptyState title='Нет заметок' />;
	}

	return (
		<Flex
			direction='column'
			component='ul'
			gap={CONTENT_GRID_SPACING}
		>
			{recentNotes.map((note) => (
				<li key={note.id} style={{ minWidth: 0, height: '100%' }}>
					<NoteCard
						note={note}
						isSaving={isSaving}
						isDeleting={isDeleting}
						onSave={updateNote}
						onDelete={deleteNote}
					/>
				</li>
			))}
		</Flex>
	);
}

export const DashboardNotesBoundary = withQueryBoundary(DashboardNotes, {
	suspenseProps: {
		fallback: <DashboardNotesSkeleton />,
	},
});
