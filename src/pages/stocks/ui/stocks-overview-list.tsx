import { Stack } from '@mantine/core';
import { useMemo } from 'react';

import type { Stock } from '@/entities/stock';

import { StocksList, StocksListSkeleton } from '@/entities/stock';
import { useGetUserStrategyCodesSuspense } from '@/entities/strategy';
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

	const { data: instrumentsLinkResponse } = useGetUserStrategyCodesSuspense({ page: 1, pageSize: 100 });

	const linkCountsByStockId = useMemo(() => {
		const counts = new Map<number, number>();
		instrumentsLinkResponse.data.items.forEach((link) => {
			counts.set(link.tradeCodeId, (counts.get(link.tradeCodeId) || 0) + 1);
		});
		return counts;
	}, [instrumentsLinkResponse.data]);

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
					page={stocksResponse.data.page}
					pageSize={STOCKS_PAGE_SIZE}
					showRange={!filters.searchQuery.trim()}
				/>

				<StocksList
					stocks={stocksResponse.data.items}
					linkCountsByStockId={linkCountsByStockId}
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
