import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { DeleteRemindButton, useRemindList } from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function DashboardReminds() {
	const { filteredReminds: allFilteredReminds, handleRemindChange } = useRemindList();
	const filteredReminds = allFilteredReminds.slice(0, 4);

	return (
		<DataState hasData={!!allFilteredReminds.length}>
			<RemindList
				reminds={filteredReminds}
				onRemindChange={handleRemindChange}
				renderAction={(remind) => <DeleteRemindButton id={remind.id} />}
			/>
		</DataState>
	);
}

export const DashboardRemindsBoundary = withQueryBoundary(DashboardReminds, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
