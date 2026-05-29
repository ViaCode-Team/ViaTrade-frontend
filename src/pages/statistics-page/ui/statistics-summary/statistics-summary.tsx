import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { StatisticsSummarySkeleton } from './statistics-summary.skeleton';
import { useStatisticsSummary } from './use-statistics-summary';

export function StatisticsSummary() {
	const { totalTrades, winRate, totalNetIncome } = useStatisticsSummary();

	return (
		<SummaryList>
			<SummaryCard title='Всего сделок' value={totalTrades} />
			<SummaryCard
				title='Винрейт'
				value={`${winRate.toFixed(1)}%`}
				color={winRate >= 50 ? 'teal' : 'red'}
			/>
			<SummaryCard
				title='Общая прибыль (Сумма)'
				value={`${totalNetIncome.toFixed(2)} ₽`}
				color={totalNetIncome >= 0 ? 'teal' : 'red'}
			/>
		</SummaryList>
	);
}


export const StatisticsSummaryBoundary = withQueryBoundary(StatisticsSummary, {
	suspenseProps: {
		fallback: <StatisticsSummarySkeleton />,
	},
});
