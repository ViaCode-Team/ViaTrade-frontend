import { useGetStrategyStatisticsSuspense } from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

function StrategiesSummary() {
	const { data: response } = useGetStrategyStatisticsSuspense();
	const {
		activeStrategies,
		disabledStrategies,
		totalStrategies,
	} = response.data;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={totalStrategies} />
			<SummaryCard title='Активные' value={activeStrategies} color='green' />
			<SummaryCard title='Отключены' value={disabledStrategies} color='gray' />
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
