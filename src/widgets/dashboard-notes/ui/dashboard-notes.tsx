import { SimpleGrid } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useNotesOverview } from '@/widgets/notes-overview/lib/use-notes-overview';

import { DashboardNoteCard } from './dashboard-note-card';
import { DashboardNotesSkeleton } from './dashboard-notes.skeleton';

export function DashboardNotes() {
	const { filteredNotes } = useNotesOverview();

	const recentNotes = filteredNotes.slice(0, 4);

	if (recentNotes.length === 0) {
		return <EmptyState title='Нет заметок' />;
	}

	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			{recentNotes.map((note) => (
				<DashboardNoteCard key={note.id} note={note} />
			))}
		</SimpleGrid>
	);
}

export const DashboardNotesBoundary = withQueryBoundary(DashboardNotes, {
	suspenseProps: {
		fallback: <DashboardNotesSkeleton />,
	},
});
