import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';
import { useNotesList } from '@/widgets/notes-list';

export function NotesSummary() {
	const { summary, isLoading } = useNotesList();
	const { total, stock, strategy } = summary;
	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} isLoading={isLoading} />
			<SummaryCard title='По акциям' value={stock} isLoading={isLoading} />
			<SummaryCard title='По стратегиям' value={strategy} isLoading={isLoading} />
		</SummaryList>
	);
}
