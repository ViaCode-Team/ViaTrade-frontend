import { Stack } from '@mantine/core';

import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { DeleteRemindButton, REMINDERS_PAGE_SIZE, useRemindList } from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { RemindsOverviewStatusBar } from './reminds-overview-status-bar';

function RemindsOverviewList() {
	const {
		reminds,
		filteredReminds,
		handleRemindChange,
		page,
		totalCount,
		totalPages,
		setPage,
		hasSearchQuery,
		resetFilters,
	} = useRemindList();

	return (
		<DataState
			hasData={!!reminds.length}
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
					onRemindChange={handleRemindChange}
					renderAction={(remind) => <DeleteRemindButton id={remind.id} />}
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
