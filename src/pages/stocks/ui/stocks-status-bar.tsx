import { Skeleton } from '@mantine/core';

import { useStocksControls } from '@/pages/stocks/ui/filter-stocks';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useStocksQuerySuspense } from '../api/stocks-query';

type StocksStatusBarProps = {
	totalCount: number;
};

export function StocksStatusBar({ totalCount }: StocksStatusBarProps) {
	const { filters } = useStocksControls();
	const { data: filteredStocks } = useStocksQuerySuspense(
		filters.searchQuery,
		filters.sortOption,
		filters.page,
	);

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredStocks.data.items.length}
		/>
	);
}

export const StocksStatusBarBoundary = withQueryBoundary(StocksStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
