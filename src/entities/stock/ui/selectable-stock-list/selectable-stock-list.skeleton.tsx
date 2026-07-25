import { SimpleGrid, Skeleton } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/ui-helpers';
import { CONTENT_GRID_SPACING } from '@/shared/model';

import cls from './selectable-stock-list.module.css';

export function SelectableStockListSkeleton() {
	return (
		<SimpleGrid
			minColWidth={300}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
		>
			{createSkeletons(4).map((item) => (
				<li key={item.id} className={cls.item}>
					<Skeleton height={80} radius='md' />
				</li>
			))}
		</SimpleGrid>
	);
}
