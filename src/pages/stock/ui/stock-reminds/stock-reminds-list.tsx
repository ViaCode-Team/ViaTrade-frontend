import { Stack } from '@mantine/core';

import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { DeleteRemindButton, REMINDERS_PAGE_SIZE, useRemindList } from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

type StockRemindsListProps = {
	instrumentId: number;
};

function StockRemindsList({ instrumentId }: StockRemindsListProps) {
	const {
		reminds,
		filteredReminds,
		handleRemindChange,
		page,
		totalPages,
		setPage,
		hasSearchQuery,
		resetFilters,
	} = useRemindList(instrumentId);

	return (
		<DataState
			hasData={!!reminds.length}
			hasResults={!!filteredReminds.length}
			onResetFilters={resetFilters}
		>
			<Stack gap='md'>
				<ListStatusBar
					totalCount={reminds.length}
					filteredCount={filteredReminds.length}
					pagination={{ page, pageSize: REMINDERS_PAGE_SIZE, showRange: !hasSearchQuery }}
				/>
				<RemindList
					reminds={filteredReminds}
					hideSourceBadge
					onRemindChange={handleRemindChange}
					renderAction={(remind) => <DeleteRemindButton id={remind.id} />}
					pagination={{ page, totalPages, onPageChange: setPage }}
				/>
			</Stack>
		</DataState>
	);
}

export const StockRemindsListBoundary = withQueryBoundary(StockRemindsList, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
