import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { DeleteRemindButton, useRemindList } from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function RemindsOverviewList() {
	const {
		reminds,
		filteredReminds,
		handleRemindChange,
	} = useRemindList();

	return (
		<DataState hasData={!!reminds.length} hasResults={!!filteredReminds.length}>
			<RemindList
				reminds={filteredReminds}
				onRemindChange={handleRemindChange}
				renderAction={(remind) => <DeleteRemindButton remindId={remind.id} />}
			/>
		</DataState>
	);
}

export const RemindsOverviewListBoundary = withQueryBoundary(RemindsOverviewList, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
