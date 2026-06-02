import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';
import { useNotesList } from '@/widgets/notes-list';

export function NotesStatusBar() {
	const { notes, filteredNotes, refetch } = useNotesList();
	return (
		<ListStatusBar
			totalCount={notes.length}
			filteredCount={filteredNotes.length}
			refreshIntervalText='Автообновление: 5 мин'
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
