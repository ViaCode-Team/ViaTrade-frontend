import { Card } from '@mantine/core';

import { AddTradeButton } from '@/features/statistic/add-trade';
import { Section } from '@/shared/ui/section';

import { useTradesHistoryFilters } from '../lib/use-trades-history';
import { TradesHistoryControls } from './trades-history-controls';
import { TradesHistoryTableBoundary } from './trades-history-table';

export function TradesHistory() {
	const filters = useTradesHistoryFilters();

	return (
		<Section header={{ title: 'История сделок', actions: <AddTradeButton /> }}>
			<Card withBorder radius='md' p={0}>
				<TradesHistoryControls
					search={filters.search}
					onSearchChange={filters.handleSearch}
					typeFilter={filters.typeFilter}
					onTypeFilterChange={filters.handleTypeFilter}
					statusFilter={filters.statusFilter}
					onStatusFilterChange={filters.handleStatusFilter}
					isFetching={filters.isFetching}
				/>

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
			</Card>
		</Section>
	);
}
