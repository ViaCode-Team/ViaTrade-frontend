import { SimpleGrid } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model';

import { StrategyCardSkeleton } from '../strategy-card/strategy-card.skeleton';

export function StrategiesListSkeleton() {
	return (
		<SimpleGrid
			minColWidth={300}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
		>
			{createSkeletons(4).map((item) => (
				<li key={item.id}>
					<StrategyCardSkeleton />
				</li>
			))}
		</SimpleGrid>
	);
}
