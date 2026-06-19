import { SimpleGrid } from '@mantine/core';

import { SignalCardSkeleton } from '@/entities/signal';
import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model';

export function SignalsListSkeleton() {
	return (
		<SimpleGrid
			minColWidth={300}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
		>
			{createSkeletons(4).map((item) => (
				<li key={item.id}>
					<SignalCardSkeleton />
				</li>
			))}
		</SimpleGrid>
	);
}
