import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { RemindCardActions, useRemindList } from '@/features/remind/manage-reminds';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function RemindsOverviewList() {
	const {
		reminds,
		filteredReminds,
		handleRemindChange,
	} = useRemindList();

	return (
		<RemindList
			reminds={filteredReminds}
			hasAnyReminds={reminds.length > 0}
			onRemindChange={handleRemindChange}
			actionSlot={(remind) => <RemindCardActions remindId={remind.id} />}
		/>
	);
}

export const RemindsOverviewListBoundary = withQueryBoundary(RemindsOverviewList, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
