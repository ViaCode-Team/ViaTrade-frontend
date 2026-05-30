import { SimpleGrid, Skeleton, Stack } from '@mantine/core';

import { StrategyCardSkeleton } from '@/entities/strategy';
import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export function StockLinkedStrategiesWidgetSkeleton() {
	return (
		<Stack gap='md'>
			{/* Controls skeleton */}
			<Stack gap='xs'>
				<Skeleton height={36} />
				<Skeleton height={20} width='40%' />
			</Stack>

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
