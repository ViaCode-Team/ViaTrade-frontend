import { useGetStockStatistics } from '@/entities/trade-code';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

type StocksMarketSummaryProps = {
	isLoading?: boolean;
};

export function StocksMarketSummary({
	isLoading,
}: StocksMarketSummaryProps) {
	const { data: response, isLoading: isStatisticsLoading } = useGetStockStatistics();
	const totalStocks = response?.data.totalStocks ?? 0;

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
