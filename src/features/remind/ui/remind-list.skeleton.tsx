import {
	Card,
	SimpleGrid,
	Skeleton,
	Stack,
} from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

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
					<Card withBorder bg='transparent' padding='sm'>
						<Stack gap='sm'>
							<Skeleton h={72} radius='sm' />
							<SimpleGrid cols={{ base: 1, xs: 2 }} spacing='sm'>
								<Skeleton h={58} radius='sm' />
								<Skeleton h={58} radius='sm' />
							</SimpleGrid>
						</Stack>
					</Card>
				</li>
			))}
		</SimpleGrid>
	);
}
