import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { NoDataState } from '@/shared/ui/app-empty-state';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useFilteredStrategies, useStrategiesData } from '@/widgets/strategies-overview';

function DashboardStrategies() {
	const { strategies } = useStrategiesData();
	const allFilteredStrategies = useFilteredStrategies(strategies);

	const filteredStrategies = allFilteredStrategies
		.filter((strategy) => strategy.isSubscribed)
		.slice(0, 4);

	return (
		<DataState
			hasData={!!strategies.length}
			hasResults={!!filteredStrategies.length}
			noResultsFallback={<NoDataState description='Подписок на стратегии пока нет. Подпишитесь на стратегию, чтобы получать её сигналы.' />}
		>
			<StrategiesList strategies={filteredStrategies} />
		</DataState>
	);
}

export const DashboardStrategiesBoundary = withQueryBoundary(DashboardStrategies, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
