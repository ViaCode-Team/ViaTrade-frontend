import { Stack } from '@mantine/core';

import { RemindList, RemindListSkeleton } from '@/entities/reminder';
import {
	DeleteRemindButton,
	filterReminds,
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
		hasSearchQuery,
		hasActiveFilters,
		resetFilters,
		searchQuery,
	} = useRemindListFilters();
	const { reminds, totalPages } = useInstrumentReminds(instrumentId, params);
	const { updateRemind } = useUpdateRemind(instrumentId);
	const filteredReminds = filterReminds(reminds, searchQuery);

	return (
		<DataState
			hasData={!!reminds.length || hasActiveFilters}
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
