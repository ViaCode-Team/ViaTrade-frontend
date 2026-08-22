import {
	mapTradeRemindToRemindItem,
	RemindList,
	RemindListSkeleton,
	useGetRemindersSuspense,
} from '@/entities/reminder';
import {
	DeleteRemindButton,
	useRemindListFilters,
	useUpdateRemind,
} from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function DashboardReminds() {
	const { params } = useRemindListFilters();
	const { data: response } = useGetRemindersSuspense(params);
	const reminds = response.data.items.map(mapTradeRemindToRemindItem);
	const { updateRemind } = useUpdateRemind();
	const filteredReminds = reminds.slice(0, 4);

	return (
		<DataState hasData={!!reminds.length}>
			<RemindList
				reminds={filteredReminds}
				onRemindChange={updateRemind}
				renderAction={(remind) => <DeleteRemindButton id={remind.id} instrumentId={remind.source ? Number(remind.source.id) : undefined} />}
			/>
		</DataState>
	);
}

export const DashboardRemindsBoundary = withQueryBoundary(DashboardReminds, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
