import { useGetTradeStatisticsSuspense } from '@/entities/trade';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { getStatisticsSummaryCardsData } from '../../model/statistics-summary';
import { StatisticsSummarySkeleton } from './statistics-summary.skeleton';

export function StatisticsSummary() {
	const { data: response } = useGetTradeStatisticsSuspense();
	const cards = getStatisticsSummaryCardsData(response.data);

	return (
		<SummaryList>
			{cards.map((card) => (
				<SummaryCard
					key={card.id}
					title={card.title}
					value={card.value}
					description={card.description}
					color={card.color}
				/>
			))}
		</SummaryList>
	);
}

export const StatisticsSummaryBoundary = withQueryBoundary(StatisticsSummary, {
	suspenseProps: {
		fallback: <StatisticsSummarySkeleton />,
	},
});
