import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type NotesSummaryProps = {
	total: number;
	stock: number;
	strategy: number;
};

export function NotesSummary({ total, stock, strategy }: NotesSummaryProps) {
	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} />
			<SummaryCard title='По акциям' value={stock} />
			<SummaryCard title='По стратегиям' value={strategy} />
		</SummaryList>
	);
}
