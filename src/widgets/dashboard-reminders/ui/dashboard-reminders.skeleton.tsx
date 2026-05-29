import { SimpleGrid } from '@mantine/core';

import { RemindCardSkeleton } from '@/entities/remind';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export function DashboardRemindersSkeleton() {
	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			<RemindCardSkeleton />
			<RemindCardSkeleton />
			<RemindCardSkeleton />
			<RemindCardSkeleton />
		</SimpleGrid>
	);
}
