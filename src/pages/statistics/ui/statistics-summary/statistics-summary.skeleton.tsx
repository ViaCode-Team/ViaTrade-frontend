import { TRADE_STATISTICS_CARDS } from '@/entities/trade';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

export function StatisticsSummarySkeleton() {
	return (
		<SummaryList>
			<SummaryCard title={TRADE_STATISTICS_CARDS.totalTrades.title} isLoading descriptionIsLoading />
			<SummaryCard title={TRADE_STATISTICS_CARDS.totalIncome.title} isLoading descriptionIsLoading />
			<SummaryCard title={TRADE_STATISTICS_CARDS.winRate.title} isLoading descriptionIsLoading />
		</SummaryList>
	);
}
