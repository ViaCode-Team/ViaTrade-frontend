import { SimpleGrid, Stack } from '@mantine/core';

import { StrategyCardSkeleton } from '@/entities/strategy';
import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

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
