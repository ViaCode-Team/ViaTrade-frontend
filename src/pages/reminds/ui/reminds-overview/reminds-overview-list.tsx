import { Stack } from '@mantine/core';

import {
	mapTradeRemindToRemindItem,
	RemindList,
	RemindListSkeleton,
	useGetRemindersSuspense,
} from '@/entities/reminder';
import {
	DeleteRemindButton,
	filterReminds,
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
		hasSearchQuery,
		hasActiveFilters,
		resetFilters,
		searchQuery,
	} = useRemindListFilters();

	const { data: response } = useGetRemindersSuspense(params);
	const { totalCount, totalPages } = response.data;

	const { updateRemind } = useUpdateRemind();

	const reminds = response.data.items.map(mapTradeRemindToRemindItem);
	const filteredReminds = filterReminds(reminds, searchQuery);

	return (
		<DataState
			hasData={!!reminds.length || hasActiveFilters}
			hasResults={!!filteredReminds.length}
			onResetFilters={resetFilters}
		>
			<Stack gap='md'>
				<RemindsOverviewStatusBar
					totalCount={totalCount}
					filteredCount={filteredReminds.length}
					pagination={{
						page,
						pageSize: REMINDERS_PAGE_SIZE,
						totalPages,
						onPageChange: setPage,
						showRange: !hasSearchQuery,
					}}
				/>

				<RemindList
					reminds={filteredReminds}
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
