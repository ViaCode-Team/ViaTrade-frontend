import { useGetNoteStatisticsSuspense } from '@/entities/note';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type NotesSummaryProps = {
	isLoading?: boolean;
};

function NotesSummaryFallback({ isLoading }: NotesSummaryProps = {}) {
	return (
		<SummaryList>
			<SummaryCard title='Всего' isLoading={isLoading} />
			<SummaryCard title='По акциям' isLoading={isLoading} />
			<SummaryCard title='По стратегиям' isLoading={isLoading} />
		</SummaryList>
	);
}

export function NotesSummary() {
	const { data: response } = useGetNoteStatisticsSuspense();
	const {
		instrumentNotes,
		strategyNotes,
		totalNotes,
	} = response.data;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={totalNotes} />
			<SummaryCard title='По акциям' value={instrumentNotes} />
			<SummaryCard title='По стратегиям' value={strategyNotes} />
		</SummaryList>
	);
}

export const NotesSummaryBoundary = withQueryBoundary(NotesSummary, {
	suspenseProps: {
		fallback: <NotesSummaryFallback isLoading />,
	},
});
