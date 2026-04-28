import {
	Box,
	SimpleGrid,
	Skeleton,
	Stack,
} from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';

export function SignalsPageSkeleton() {
	return (
		<Stack gap='lg'>
			<Stack gap='sm'>
				<SimpleGrid minColWidth={280} spacing={{ base: 'sm', sm: 'lg' }}>
					{createSkeletons(4).map((item) => (
						<Skeleton key={item.id} h={36} />
					))}
				</SimpleGrid>

				<Skeleton h={18} w={138} />
			</Stack>

			<SimpleGrid
				minColWidth={300}
				spacing={{ base: 'sm', sm: 'lg' }}
				component='ul'
				p={0}
				m={0}
			>
				{createSkeletons(6).map((item) => (
					<Box key={item.id} component='li' h='100%' style={{ listStyle: 'none' }}>
						<Skeleton h={222} />
					</Box>
				))}
			</SimpleGrid>
		</Stack>
	);
}
