import { Stack } from '@mantine/core';

import type { Stock } from '@/entities/stock';

import { StocksList, StocksListSkeleton } from '@/entities/stock';
import { useStocksControls } from '@/pages/stocks/ui/filter-stocks';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { STOCKS_PAGE_SIZE, useStocksQuerySuspense } from '../api/stocks-query';
import { StocksOverviewStatusBar } from './stocks-overview-status-bar';

type StocksListViewProps = {
	onLinkedStrategiesClick: (stock: Stock) => void;
};

function StocksOverviewList({ onLinkedStrategiesClick }: StocksListViewProps) {
	const { filters, setFilters, resetFilters } = useStocksControls();
	const { data: stocksResponse } = useStocksQuerySuspense(
		filters.searchQuery,
		filters.sortOption,
		filters.page,
	);

	return (
		<DataState
			hasData={!!stocksResponse.data.totalCount}
			hasResults={!!stocksResponse.data.items.length}
			onResetFilters={resetFilters}
		>
			<Stack gap='md'>
				<StocksOverviewStatusBar
					totalCount={stocksResponse.data.totalCount}
					filteredCount={stocksResponse.data.items.length}
					pagination={{
						page: stocksResponse.data.page,
						pageSize: STOCKS_PAGE_SIZE,
						totalPages: stocksResponse.data.totalPages,
						onPageChange: (page) => setFilters({ page: String(page) }),
						showRange: !filters.searchQuery.trim(),
					}}
				/>

				<StocksList
					stocks={stocksResponse.data.items}
					onLinkedStrategiesClick={onLinkedStrategiesClick}
					pagination={{
						page: stocksResponse.data.page,
						totalPages: stocksResponse.data.totalPages,
						onPageChange: (page) => setFilters({ page: String(page) }),
					}}
				/>
			</Stack>
		</DataState>
	);
}

export const StocksOverviewListBoundary = withQueryBoundary(StocksOverviewList, {
	suspenseProps: {
		fallback: <StocksListSkeleton />,
	},
});
