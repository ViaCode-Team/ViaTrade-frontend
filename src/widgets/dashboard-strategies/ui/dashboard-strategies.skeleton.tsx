import { SimpleGrid } from '@mantine/core';

import { StrategyCardSkeleton } from '@/entities/strategy';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export function DashboardStrategiesSkeleton() {
	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			<StrategyCardSkeleton />
			<StrategyCardSkeleton />
			<StrategyCardSkeleton />
			<StrategyCardSkeleton />
		</SimpleGrid>
	);
}
