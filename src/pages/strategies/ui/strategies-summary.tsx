import { useGetStrategyStatisticsSuspense } from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

function StrategiesSummary() {
	const { data: response } = useGetStrategyStatisticsSuspense();
	const {
		subscribedStrategiesCount,
		unsubscribedStrategiesCount,
		totalStrategiesCount,
	} = response.data;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={totalStrategiesCount} />
			<SummaryCard title='Подписаны' value={subscribedStrategiesCount} color='green' />
			<SummaryCard title='Не подписаны' value={unsubscribedStrategiesCount} color='gray' />
		</SummaryList>
	);
}

export const StrategiesSummaryBoundary = withQueryBoundary(StrategiesSummary, {
	suspenseProps: {
		fallback: (
			<SummaryList>
				<SummaryCard title='Всего' isLoading />
				<SummaryCard title='Подписаны' isLoading color='green' />
				<SummaryCard title='Не подписаны' isLoading color='gray' />
			</SummaryList>
		),
	},
});
