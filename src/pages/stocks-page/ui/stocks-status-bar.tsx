import { Skeleton } from '@mantine/core';

import { useStocksControls } from '@/features/stock/filter-stocks';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStocksQuerySuspense } from '../model/stocks-query';

type StocksStatusBarProps = {
	totalCount: number;
};

export function StocksStatusBar({ totalCount }: StocksStatusBarProps) {
	const { filters } = useStocksControls();
	const { data: filteredStocks, refetch } = useStocksQuerySuspense(
		filters.searchQuery,
		filters.sortOption,
	);

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredStocks.length}
			refreshIntervalText='Автообновление: 5 мин'
			onRefresh={refetch}
		/>
	);
}

export const StocksStatusBarBoundary = withQueryBoundary(StocksStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
