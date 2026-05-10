import {
	SimpleGrid,
	Skeleton,
	Stack,
} from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import cls from '../stocks-page.module.css';

export function StockLinkedStrategiesModalContentSkeleton() {
	return (
		<Stack gap='md'>
			<Skeleton h={20} w={140} />

			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
				className={cls.grid}
			>
				{createSkeletons(3).map((item) => (
					<Skeleton key={item.id} component='li' h={260} />
				))}
			</SimpleGrid>
		</Stack>
	);
}
