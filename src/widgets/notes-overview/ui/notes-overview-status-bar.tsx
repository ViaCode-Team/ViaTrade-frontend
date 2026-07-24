import type { NotesSourceFilter } from '@/features/note/filter-notes';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { ValueBadge } from '@/shared/ui/value-badge';

type NotesOverviewStatusBarProps = {
	totalCount: number;
	filteredCount: number;
	page: number;
	pageSize: number;
	showRange: boolean;
	sourceFilter: NotesSourceFilter;
	stockNotesCount: number;
	strategyNotesCount: number;
};

export function NotesOverviewStatusBar({
	totalCount,
	filteredCount,
	page,
	pageSize,
	showRange,
	sourceFilter,
	stockNotesCount,
	strategyNotesCount,
}: NotesOverviewStatusBarProps) {
	const showSourceBadges = sourceFilter === 'all';

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			pagination={{ page, pageSize, showRange }}
			badges={showSourceBadges
				? (
						<>
							{stockNotesCount > 0 && <ValueBadge variant='dot' color='blue' size='sm' label='К акциям' value={stockNotesCount} />}
							{strategyNotesCount > 0 && <ValueBadge variant='dot' color='violet' size='sm' label='К стратегиям' value={strategyNotesCount} />}
						</>
					)
				: null}
		/>
	);
}
