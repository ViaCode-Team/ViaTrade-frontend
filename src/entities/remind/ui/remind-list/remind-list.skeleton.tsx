import { SimpleGrid } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/ui-helpers';
import { CONTENT_GRID_SPACING } from '@/shared/model';

import { RemindCardSkeleton } from '../remind-card.skeleton';
import cls from './remind-list.module.css';

const REMIND_CARD_SKELETONS = 2;

export function RemindListSkeleton() {
	return (
		<div className={cls.container}>
			<SimpleGrid
				className={cls.grid}
				minColWidth='var(--list-min-col-width)'
				spacing={CONTENT_GRID_SPACING}
				autoFlow='auto-fit'
				component='ul'
			>
				{createSkeletons(REMIND_CARD_SKELETONS).map((item) => (
					<li key={item.id}>
						<RemindCardSkeleton />
					</li>
				))}
			</SimpleGrid>
		</div>
	);
}
