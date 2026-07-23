import { getFilteredNotes, useNotesControls } from '@/features/note/filter-notes';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';
import { usePersonalNotes } from '@/widgets/notes-overview';

export function NotesStatusBar() {
	const { notes, totalCount } = usePersonalNotes();
	const { filters } = useNotesControls();

	const filteredNotes = getFilteredNotes({
		notes,
		searchQuery: filters.searchQuery,
		sourceFilter: filters.sourceFilter,
	});

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredNotes.length}
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
