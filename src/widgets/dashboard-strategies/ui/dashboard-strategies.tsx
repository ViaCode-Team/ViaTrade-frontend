import { SimpleGrid } from '@mantine/core';

import { StrategyCard, toStrategyCardStrategy } from '@/entities/strategy';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { useStrategiesOverview } from '@/widgets/strategies-overview/lib/use-strategies-overview';

import { DashboardStrategiesSkeleton } from './dashboard-strategies.skeleton';

export function DashboardStrategies() {
	const { filteredStrategies } = useStrategiesOverview();

	// Filter active strategies and take only the first 4 for the dashboard
	const activeStrategies = filteredStrategies.filter((s) => s.isActive).slice(0, 4);

	if (activeStrategies.length === 0) {
		return <EmptyState title='Нет активных стратегий' />;
	}

	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			{activeStrategies.map((strategy) => (
				<StrategyCard
					key={strategy.id}
					strategy={toStrategyCardStrategy(strategy, strategy.isActive)}
				/>
			))}
		</SimpleGrid>
	);
}

export const DashboardStrategiesBoundary = withQueryBoundary(DashboardStrategies, {
	suspenseProps: {
		fallback: <DashboardStrategiesSkeleton />,
	},
});
