import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type StocksMarketSummaryProps = {
	totalCount: number;
	isLoading?: boolean;
};

export function StocksMarketSummary({
	totalCount,
	isLoading,
}: StocksMarketSummaryProps) {
	return (
		<SummaryList>
			<SummaryCard
				title='Инструменты'
				value={totalCount}
				isLoading={isLoading}
			/>
		</SummaryList>
	);
}
