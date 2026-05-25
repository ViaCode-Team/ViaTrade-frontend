import { SimpleGrid } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import { RemindCardSkeleton } from './remind-card.skeleton';
import cls from './remind-list.module.css';

const REMIND_CARD_SKELETONS = 2;

export function RemindListSkeleton() {
	return (
		<SimpleGrid
			minColWidth={320}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
			className={cls.grid}
		>
			{createSkeletons(REMIND_CARD_SKELETONS).map((item) => (
				<li key={item.id} className={cls.item}>
					<RemindCardSkeleton />
				</li>
			))}
		</SimpleGrid>
	);
}
