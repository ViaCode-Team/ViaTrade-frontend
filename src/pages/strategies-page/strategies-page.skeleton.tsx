import {
	Box,
	SimpleGrid,
	Skeleton,
	Stack,
} from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';

import cls from './strategies-page.module.css';

export function StrategiesPageSkeleton() {
	return (
		<Stack gap='lg'>
			<Stack gap='xs'>
				<Skeleton h={34} w={150} />
				<Skeleton h={18} maw={520} />
			</Stack>

			<SimpleGrid
				minColWidth={300}
				spacing={{ base: 'sm', sm: 'lg' }}
				component='ul'
				className={cls.grid}
			>
				{createSkeletons(6).map((item) => (
					<Box key={item.id} component='li' className={cls.item}>
						<Skeleton h={258} />
					</Box>
				))}
			</SimpleGrid>
		</Stack>
	);
}
