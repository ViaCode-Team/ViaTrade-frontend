import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { RemindCardActions, useRemindList } from '@/features/remind/manage-reminds';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function DashboardRemindsWidget() {
	const { filteredReminds: allFilteredReminds, handleRemindChange } = useRemindList();
	const filteredReminds = allFilteredReminds.slice(0, 4);

	return (
		<RemindList
			reminds={filteredReminds}
			hasAnyReminds={allFilteredReminds.length > 0}
			onRemindChange={handleRemindChange}
			actionSlot={(remind) => <RemindCardActions remindId={remind.id} />}
		/>
	);
}

export const DashboardRemindsWidgetBoundary = withQueryBoundary(DashboardRemindsWidget, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
