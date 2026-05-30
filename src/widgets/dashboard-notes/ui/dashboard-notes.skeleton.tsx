import { Card, SimpleGrid, Skeleton, Stack } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export function DashboardNotesSkeleton() {
	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			{createSkeletons(4).map((item) => (
				<Card key={item.id} withBorder p='md'>
					<Stack gap='sm'>
						<Skeleton height={20} width={80} />
						<Skeleton height={24} width='60%' />
						<Skeleton height={60} />
					</Stack>
				</Card>
			))}
		</SimpleGrid>
	);
}
