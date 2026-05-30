import { Card, Stack } from '@mantine/core';

import { TradesHistoryControls, useTradesHistoryControls } from '@/features/trade/filter-trades';

import { TradesHistoryTableBoundary } from './trades-history-table';

export function TradesHistory() {
	const filters = useTradesHistoryControls();

	return (
		<Card withBorder radius='md' p={{ base: 'xs', sm: 'md' }}>
			<Stack gap='xs'>
				<TradesHistoryControls />

				<TradesHistoryTableBoundary
					search={filters.search}
					typeFilter={filters.typeFilter}
					statusFilter={filters.statusFilter}
					sortField={filters.sortField}
					sortDirection={filters.sortDirection}
					page={filters.page}
					isFetching={filters.isFetching}
					setSorting={filters.setSorting}
					setPage={filters.setPage}
				/>
			</Stack>
		</Card>
	);
}
