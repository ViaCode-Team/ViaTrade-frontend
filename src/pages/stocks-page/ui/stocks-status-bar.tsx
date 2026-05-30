import { Skeleton } from '@mantine/core';

import type { StockSortOption, StockTrendFilter } from '@/features/stock/filter-stocks';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

import { useStocksQuery } from '../model/stocks-query';

type StocksStatusBarProps = {
	searchQuery: string;
	trendFilter: StockTrendFilter;
	sortOption: StockSortOption;
	totalCount: number;
};

export function StocksStatusBar({
	searchQuery,
	trendFilter,
	sortOption,
	totalCount,
}: StocksStatusBarProps) {
	const { data: filteredStocks } = useStocksQuery(searchQuery, trendFilter, sortOption);

	const gainersCount = filteredStocks.filter((s) => s.dayChangePercent > 0).length;
	const losersCount = filteredStocks.filter((s) => s.dayChangePercent < 0).length;

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredStocks.length}
			refreshIntervalText='Автообновление: 1 мин'
			badges={(
				<>
					<ValueBadge variant='dot' color='green' size='sm' label='Растут' value={gainersCount} />
					<ValueBadge variant='dot' color='red' size='sm' label='Падают' value={losersCount} />
				</>
			)}
		/>
	);
}

export const StocksStatusBarBoundary = withQueryBoundary(StocksStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} radius='md' />,
	},
});
