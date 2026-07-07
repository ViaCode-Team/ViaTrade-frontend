import { SimpleGrid, Stack } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/ui-helpers';
import { CONTENT_GRID_SPACING } from '@/shared/model';

import { StrategyCardSkeleton } from '../strategy-card/strategy-card.skeleton';

export function StockLinkedStrategiesListSkeleton() {
	return (
		<Stack gap='md'>
			{/* List skeleton */}
			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{createSkeletons(3).map((item) => (
					<li key={item.id}>
						<StrategyCardSkeleton />
					</li>
				))}
			</SimpleGrid>
		</Stack>
	);
}
