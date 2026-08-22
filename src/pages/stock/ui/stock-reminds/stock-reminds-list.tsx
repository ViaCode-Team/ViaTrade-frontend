import { Stack } from '@mantine/core';

import { RemindList, RemindListSkeleton } from '@/entities/reminder';
import {
	DeleteRemindButton,
	REMINDERS_PAGE_SIZE,
	useInstrumentReminds,
	useRemindListFilters,
	useUpdateRemind,
} from '@/features/remind/manage-reminds';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StockRemindsStatusBar } from './stock-reminds-status-bar';

type StockRemindsListProps = {
	instrumentId: number;
};

function StockRemindsList({ instrumentId }: StockRemindsListProps) {
	const {
		params,
		page,
		setPage,
		hasActiveFilters,
		resetFilters,
	} = useRemindListFilters();
	const { reminds, totalCount, totalPages } = useInstrumentReminds(instrumentId, params);
	const { updateRemind } = useUpdateRemind(instrumentId);

	return (
		<DataState
			hasData={!!totalCount || hasActiveFilters}
			hasResults={!!reminds.length}
			onResetFilters={resetFilters}
		>
			<Stack gap='md'>
				<StockRemindsStatusBar
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
					hideSourceBadge
					onRemindChange={updateRemind}
					renderAction={(remind) => <DeleteRemindButton id={remind.id} instrumentId={instrumentId} />}
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
