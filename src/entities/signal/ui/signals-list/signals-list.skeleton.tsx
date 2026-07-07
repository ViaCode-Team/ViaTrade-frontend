import { SimpleGrid } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/ui-helpers';
import { CONTENT_GRID_SPACING } from '@/shared/model';

import { SignalCardSkeleton } from '../signal-card/signal-card.skeleton';

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
