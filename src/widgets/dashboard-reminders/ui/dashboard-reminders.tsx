import { SimpleGrid } from '@mantine/core';

import { mapTradeRemindToRemindItem, RemindCard } from '@/entities/remind';
import { useGetAllByUserSuspense } from '@/entities/remind/api/gen';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { DashboardRemindersSkeleton } from './dashboard-reminders.skeleton';

export function DashboardReminders() {
	const { data: response } = useGetAllByUserSuspense();

	// Map to RemindItem and take up to 4
	const reminders = response.data
		.map(mapTradeRemindToRemindItem)
		.slice(0, 4);

	if (reminders.length === 0) {
		return <EmptyState title='Нет активных напоминаний' />;
	}

	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			{reminders.map((remind) => (
				<RemindCard
					key={remind.id}
					remind={remind}
					onRemindChange={() => {}}
				/>
			))}
		</SimpleGrid>
	);
}

export const DashboardRemindersBoundary = withQueryBoundary(DashboardReminders, {
	suspenseProps: {
		fallback: <DashboardRemindersSkeleton />,
	},
});
