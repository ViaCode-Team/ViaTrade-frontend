import { getFilteredNotes, useNotesControls } from '@/features/note/filter-notes';
import { QUERY_REFETCH_INTERVAL_TEXT } from '@/shared/model';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';
import { usePersonalNotes } from '@/widgets/notes-overview';

export function NotesStatusBar() {
	const { notes, refetch } = usePersonalNotes();
	const { filters } = useNotesControls();

	const filteredNotes = getFilteredNotes({
		notes,
		searchQuery: filters.searchQuery,
		sourceFilter: filters.sourceFilter,
	});

	return (
		<ListStatusBar
			totalCount={notes.length}
			filteredCount={filteredNotes.length}
			refreshIntervalText={QUERY_REFETCH_INTERVAL_TEXT}
			onRefresh={refetch}
			badges={(
				<>
					<ValueBadge
						variant='dot'
						color='blue'
						size='sm'
						label='К акциям'
						value={filteredNotes.filter((n) => n.source.type === 'stock').length}
					/>
					<ValueBadge
						variant='dot'
						color='violet'
						size='sm'
						label='К стратегиям'
						value={filteredNotes.filter((n) => n.source.type === 'strategy').length}
					/>
				</>
			)}
		/>
	);
}
