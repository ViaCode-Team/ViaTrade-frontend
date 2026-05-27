import { SimpleGrid } from '@mantine/core';

import { RemindCardSkeleton } from '@/entities/remind';
import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';


const REMIND_CARD_SKELETONS = 2;

export function RemindListSkeleton() {
	return (
		<SimpleGrid
			minColWidth={320}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
		>
			{createSkeletons(REMIND_CARD_SKELETONS).map((item) => (
				<li key={item.id}>
					<RemindCardSkeleton />
				</li>
			))}
		</SimpleGrid>
	);
}
