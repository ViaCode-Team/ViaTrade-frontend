import { Stack } from '@mantine/core';

import type { NotesSourceFilter } from '@/features/note/filter-notes';

import { NotesList, NotesListSkeleton } from '@/entities/note';
import { getFilteredNotes } from '@/features/note/filter-notes';
import { NoteCard } from '@/features/note/manage-note';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useNotesMutations } from '../lib/hooks/use-notes-mutations';
import { NOTES_PAGE_SIZE, usePersonalNotes } from '../lib/hooks/use-personal-notes';
import { NotesOverviewStatusBar } from './notes-overview-status-bar';

export type NotesOverviewListProps = {
	searchQuery: string;
	sourceFilter: NotesSourceFilter;
	onResetFilters: () => void;
};

function NotesOverviewList({ searchQuery, sourceFilter, onResetFilters }: NotesOverviewListProps) {
	const {
		notes: allNotes,
		page,
		totalCount,
		totalPages,
		setPage,
	} = usePersonalNotes();
	const { isNoteSaving, isNoteDeleting, updateNote, deleteNote } = useNotesMutations();

	const resultNotes = getFilteredNotes({
		notes: allNotes,
		searchQuery,
		sourceFilter,
	});
	const stockNotesCount = resultNotes.filter((note) => note.source.type === 'stock').length;
	const strategyNotesCount = resultNotes.length - stockNotesCount;

	return (
		<DataState
			hasData={!!allNotes.length || Boolean(searchQuery.trim()) || sourceFilter !== 'all'}
			hasResults={!!resultNotes.length}
			onResetFilters={onResetFilters}
		>
			<Stack gap='md'>
				<NotesOverviewStatusBar
					totalCount={totalCount}
					filteredCount={resultNotes.length}
					pagination={{
						page,
						pageSize: NOTES_PAGE_SIZE,
						totalPages,
						onPageChange: setPage,
						showRange: !searchQuery.trim() && sourceFilter === 'all',
					}}
					sourceFilter={sourceFilter}
					stockNotesCount={stockNotesCount}
					strategyNotesCount={strategyNotesCount}
				/>

				<NotesList
					notes={resultNotes}
					renderNote={(note) => (
						<NoteCard
							note={note}
							isSaving={isNoteSaving(note)}
							isDeleting={isNoteDeleting(note)}
							onSave={updateNote}
							onDelete={deleteNote}
						/>
					)}
					pagination={{ page, totalPages, onPageChange: setPage }}
				/>
			</Stack>
		</DataState>
	);
}

export const NotesOverviewListBoundary = withQueryBoundary(NotesOverviewList, {
	suspenseProps: {
		fallback: <NotesListSkeleton />,
	},
});
