import { useMemo } from 'react';

import { getNotesSummary } from '@/features/note/filter-notes';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';
import { usePersonalNotes } from '@/widgets/notes-overview-widget';

type NotesSummaryProps = {
	isLoading?: boolean;
};

export function NotesSummary({ isLoading }: NotesSummaryProps = {}) {
	const { notes } = usePersonalNotes();
	const summary = useMemo(() => getNotesSummary(notes), [notes]);
	const { total, stock, strategy } = summary;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} isLoading={isLoading} />
			<SummaryCard title='По акциям' value={stock} isLoading={isLoading} />
			<SummaryCard title='По стратегиям' value={strategy} isLoading={isLoading} />
		</SummaryList>
	);
}

export const NotesSummaryBoundary = withQueryBoundary(NotesSummary, {
	suspenseProps: {
		fallback: <NotesSummary isLoading />,
	},
});
