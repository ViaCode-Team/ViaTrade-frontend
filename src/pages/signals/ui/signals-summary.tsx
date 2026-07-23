import { useGetStrategyResultStatisticsSuspense } from '@/entities/signal';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

function SignalsSummary() {
	const { data } = useGetStrategyResultStatisticsSuspense();
	const {
		buySignals,
		sellSignals,
		totalSignals,
	} = data.data;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={totalSignals} />
			<SummaryCard title='Покупать' value={buySignals} color='green' />
			<SummaryCard title='Продавать' value={sellSignals} color='red' />
		</SummaryList>
	);
}

export const SignalsSummaryBoundary = withQueryBoundary(SignalsSummary, {
	suspenseProps: {
		fallback: (
			<SummaryList>
				<SummaryCard title='Всего' isLoading />
				<SummaryCard title='Покупать' isLoading color='green' />
				<SummaryCard title='Продавать' isLoading color='red' />
			</SummaryList>
		),
	},
});
