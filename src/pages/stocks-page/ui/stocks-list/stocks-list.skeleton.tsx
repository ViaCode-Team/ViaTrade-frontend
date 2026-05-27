import { SimpleGrid } from '@mantine/core';

import { StockCardSkeleton } from '@/entities/trade-code/stock';
import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

const skeletons = createSkeletons(6);

export function StocksListSkeleton() {
	return (
		<SimpleGrid
			minColWidth={300}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
		>
			{skeletons.map((skeleton) => (
				<li key={skeleton.id}>
					<StockCardSkeleton />
				</li>
			))}
		</SimpleGrid>
	);
}
