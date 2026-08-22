import { Stack } from '@mantine/core';

import {
	mapTradeRemindToRemindItem,
	RemindList,
	RemindListSkeleton,
	useGetRemindersSuspense,
} from '@/entities/reminder';
import {
	DeleteRemindButton,
	REMINDERS_PAGE_SIZE,
	useRemindListFilters,
	useUpdateRemind,
} from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { RemindsOverviewStatusBar } from './reminds-overview-status-bar';

function RemindsOverviewList() {
	const {
		params,
		page,
		setPage,
		hasActiveFilters,
		resetFilters,
	} = useRemindListFilters();

	const { data: response } = useGetRemindersSuspense(params);
	const { totalCount, totalPages } = response.data;

	const { updateRemind } = useUpdateRemind();

	const reminds = response.data.items.map(mapTradeRemindToRemindItem);

	return (
		<DataState
			hasData={!!totalCount || hasActiveFilters}
			hasResults={!!reminds.length}
			onResetFilters={resetFilters}
		>
			<Stack gap='md'>
				<RemindsOverviewStatusBar
					totalCount={totalCount}
					filteredCount={reminds.length}
					pagination={{
						page,
						pageSize: REMINDERS_PAGE_SIZE,
						totalPages,
						onPageChange: setPage,
					}}
				/>

				<RemindList
					reminds={reminds}
					onRemindChange={updateRemind}
					renderAction={(remind) => <DeleteRemindButton id={remind.id} instrumentId={remind.source ? Number(remind.source.id) : undefined} />}
					pagination={{ page, totalPages, onPageChange: setPage }}
				/>
			</Stack>
		</DataState>
	);
}

export const RemindsOverviewListBoundary = withQueryBoundary(RemindsOverviewList, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
