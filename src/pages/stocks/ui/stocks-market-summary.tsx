import { useGetInstrumentStatistics } from '@/entities/instrument';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type StocksMarketSummaryProps = {
	isLoading?: boolean;
};

export function StocksMarketSummary({
	isLoading,
}: StocksMarketSummaryProps) {
	const { data: response, isLoading: isStatisticsLoading } = useGetInstrumentStatistics();
	const totalStocks = response?.data.totalInstruments ?? 0;

	return (
		<SummaryList>
			<SummaryCard
				title='Инструменты'
				value={totalStocks}
				isLoading={isLoading || isStatisticsLoading}
			/>
		</SummaryList>
	);
}
