import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';

import type { useNotesOverview } from '../lib/use-notes-overview';

type NotesStatusBarProps = {
	notesCount: number;
	filteredNotes: ReturnType<typeof useNotesOverview>['filteredNotes'];
};

export function NotesStatusBar({ notesCount, filteredNotes }: NotesStatusBarProps) {
	if (notesCount === 0) {
		return null;
	}

	return (
		<ListStatusBar
			totalCount={notesCount}
			filteredCount={filteredNotes.length}
			refreshIntervalText='Автообновление: 1 мин'
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
