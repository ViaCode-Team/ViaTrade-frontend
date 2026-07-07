import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useFilteredStrategies, useStrategiesData } from '@/widgets/strategies-overview';

function DashboardStrategies() {
	const { strategies } = useStrategiesData();
	const allFilteredStrategies = useFilteredStrategies(strategies);

	const filteredStrategies = allFilteredStrategies.filter((s: any) => s.isActive).slice(0, 4);

	return (
		<StrategiesList
			strategies={filteredStrategies}
			hasAnyStrategies={strategies.length > 0}
		/>
	);
}

export const DashboardStrategiesBoundary = withQueryBoundary(DashboardStrategies, {
	suspenseProps: {
		fallback: <StrategiesListSkeleton />,
	},
});
