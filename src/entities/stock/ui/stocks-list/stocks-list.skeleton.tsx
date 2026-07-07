import { SimpleGrid } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/ui-helpers';
import { CONTENT_GRID_SPACING } from '@/shared/model';

import { StockCardSkeleton } from '../stock-card/stock-card.skeleton';

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
