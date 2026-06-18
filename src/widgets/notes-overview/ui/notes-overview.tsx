import { Stack } from '@mantine/core';

import { NotesControls, useNotesControls } from '@/features/note/filter-notes';

import { NotesOverviewListBoundary } from './notes-overview-list';
import { NotesStatusBar } from './notes-status-bar';

export function NotesOverview() {
	const { filters } = useNotesControls();

	return (
		<Stack gap='md'>
			<Stack gap='xs'>
				<NotesControls isLoading={false} />
				<NotesStatusBar />
			</Stack>

			<NotesOverviewListBoundary
				searchQuery={filters.searchQuery}
				sourceFilter={filters.sourceFilter}
			/>
		</Stack>
	);
}
