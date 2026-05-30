import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type NotesSummaryProps = {
	total: number;
	stock: number;
	strategy: number;
	isLoading?: boolean;
};

export function NotesSummary({ total, stock, strategy, isLoading }: NotesSummaryProps) {
	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} isLoading={isLoading} />
			<SummaryCard title='По акциям' value={stock} isLoading={isLoading} />
			<SummaryCard title='По стратегиям' value={strategy} isLoading={isLoading} />
		</SummaryList>
	);
}
