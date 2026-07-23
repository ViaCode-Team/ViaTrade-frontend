import { useGetStrategyStatisticsSuspense } from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

function StrategiesSummary() {
	const { data: response } = useGetStrategyStatisticsSuspense();
	const {
		activeStrategiesCount,
		notLinkedStrategiesCount,
		totalStrategiesCount,
	} = response.data;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={totalStrategiesCount} />
			<SummaryCard title='Активные' value={activeStrategiesCount} color='green' />
			<SummaryCard title='Не привязаны' value={notLinkedStrategiesCount} color='gray' />
		</SummaryList>
	);
}

export const StrategiesSummaryBoundary = withQueryBoundary(StrategiesSummary, {
	suspenseProps: {
		fallback: (
			<SummaryList>
				<SummaryCard title='Всего' isLoading />
				<SummaryCard title='Активные' isLoading color='green' />
				<SummaryCard title='Отключены' isLoading color='gray' />
			</SummaryList>
		),
	},
});
