import { Card, SimpleGrid, Skeleton, Stack } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export function DashboardNotesSkeleton() {
	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			{Array.from({ length: 4 }).map((_, i) => (
				<Card key={`skeleton-note-${i}`} withBorder p='md'>
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
