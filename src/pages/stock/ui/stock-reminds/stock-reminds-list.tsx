import { Stack } from '@mantine/core';

import { RemindList, RemindListSkeleton } from '@/entities/remind';
import { DeleteRemindButton, REMINDERS_PAGE_SIZE, useRemindList } from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StockRemindsStatusBar } from './stock-reminds-status-bar';

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
				<StockRemindsStatusBar
					totalCount={reminds.length}
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
