import {
	SimpleGrid,
	Skeleton,
} from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import cls from '../strategies-page.module.css';

export function StrategiesGridSkeleton() {
	return (
		<SimpleGrid
			minColWidth={300}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
			className={cls.grid}
		>
			{createSkeletons(4).map((item) => (
				<Skeleton key={item.id} component='li' h={300} className={cls.item} />
			))}
		</SimpleGrid>
	);
}
