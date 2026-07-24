import { Stack } from '@mantine/core';

import type { NotesSourceFilter } from '@/features/note/filter-notes';

import { NotesList, NotesListSkeleton } from '@/entities/note';
import { getFilteredNotes } from '@/features/note/filter-notes';
import { NoteCard } from '@/features/note/manage-note';
import { DataState } from '@/shared/ui/data-state';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

import { useNotesMutations } from '../lib/hooks/use-notes-mutations';
import { NOTES_PAGE_SIZE, usePersonalNotes } from '../lib/hooks/use-personal-notes';

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
			hasData={!!allNotes.length}
			hasResults={!!resultNotes.length}
			onResetFilters={onResetFilters}
		>
			<Stack gap='md'>
				<ListStatusBar
					totalCount={totalCount}
					filteredCount={resultNotes.length}
					pagination={{ page, pageSize: NOTES_PAGE_SIZE, showRange: !searchQuery.trim() && sourceFilter === 'all' }}
					badges={(
						<>
							{sourceFilter === 'all' && stockNotesCount > 0 && (
								<ValueBadge variant='dot' color='blue' size='sm' label='К акциям' value={stockNotesCount} />
							)}
							{sourceFilter === 'all' && strategyNotesCount > 0 && (
								<ValueBadge variant='dot' color='violet' size='sm' label='К стратегиям' value={strategyNotesCount} />
							)}
						</>
					)}
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
