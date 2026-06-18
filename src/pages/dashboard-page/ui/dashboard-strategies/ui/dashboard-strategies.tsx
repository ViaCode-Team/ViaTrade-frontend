import { StrategiesList, StrategiesListSkeleton } from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useStrategiesOverview } from '@/widgets/strategies-overview/lib/use-strategies-overview';

function DashboardStrategies() {
	const {
		strategies,
		filteredStrategies: allFilteredStrategies,
	} = useStrategiesOverview();

	const filteredStrategies = allFilteredStrategies.filter((s) => s.isActive).slice(0, 4);

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
