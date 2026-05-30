import { SimpleGrid, Skeleton } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import cls from './strategy-stock-binding-list.module.css';

export function StrategyStockBindingListSkeleton() {
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
