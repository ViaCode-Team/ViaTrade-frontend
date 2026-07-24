import { Stack } from '@mantine/core';

import { NotesControls, useNotesControls } from '@/features/note/filter-notes';

import { NotesOverviewListBoundary } from './notes-overview-list';

export function NotesOverview() {
	const { filters, resetFilters } = useNotesControls();

	return (
		<Stack gap='md'>
			<NotesControls />

			<NotesOverviewListBoundary
				searchQuery={filters.searchQuery}
				sourceFilter={filters.sourceFilter}
				onResetFilters={resetFilters}
			/>
		</Stack>
	);
}
