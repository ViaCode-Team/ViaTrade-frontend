import {
	Group,
	Paper,
	SimpleGrid,
	Skeleton,
	Stack,
} from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';

export function DashboardPageSkeleton() {
	return (
		<Stack gap='lg'>
			<Skeleton h={34} w={260} />

			<Stack gap='sm'>
				<Skeleton h={26} w={180} />
				<SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing='lg'>
					{createSkeletons(4).map((item) => (
						<Paper key={item.id} p='lg' withBorder>
							<Stack gap='sm'>
								<Group gap='sm'>
									<Skeleton h={38} w={38} radius='sm' />
									<Skeleton h={18} w={110} />
								</Group>
								<Skeleton h={30} w={120} />
								<Skeleton h={16} w='85%' />
							</Stack>
						</Paper>
					))}
				</SimpleGrid>
			</Stack>

			<Stack gap='sm'>
				<Skeleton h={26} w={220} />
				<Paper p='sm' withBorder>
					<SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing='sm'>
						{createSkeletons(6).map((item) => (
							<Skeleton key={item.id} h={104} />
						))}
					</SimpleGrid>
				</Paper>
			</Stack>
		</Stack>
	);
}
