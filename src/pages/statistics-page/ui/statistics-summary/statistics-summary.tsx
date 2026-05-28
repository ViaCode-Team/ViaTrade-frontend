import { useGetByUserSuspense } from '@/entities/statistic/api/gen';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { StatisticsSummarySkeleton } from './statistics-summary.skeleton';

export function StatisticsSummary() {
	const { data } = useGetByUserSuspense();
	const trades =	data.data;

	const totalTrades = trades.length;

	const profitableTrades = trades.filter((t) => (t.netIncome ?? 0) > 0).length;

	const winRate = totalTrades > 0 ? (profitableTrades / totalTrades) * 100 : 0;

	const totalNetIncome = trades.reduce((acc, t) => acc + (t.netIncome ?? 0), 0);

	return (
		<SummaryList>
			<SummaryCard title='Всего сделок' value={totalTrades} />
			<SummaryCard
				title='Винрейт'
				value={`${winRate.toFixed(1)}%`}
				color={winRate >= 50 ? 'teal' : 'red'}
			/>
			<SummaryCard
				title='Общая прибыль (PnL)'
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
