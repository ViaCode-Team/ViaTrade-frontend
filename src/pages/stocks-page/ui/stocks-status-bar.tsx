import { Skeleton } from '@mantine/core';

import { useStocksControls } from '@/features/stock/filter-stocks';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

import { useStocksQuery } from '../model/stocks-query';

type StocksStatusBarProps = {
	totalCount: number;
};

export function StocksStatusBar({ totalCount }: StocksStatusBarProps) {
	const { filters } = useStocksControls();
	const { data: filteredStocks, refetch } = useStocksQuery(
		filters.searchQuery,
		filters.trendFilter,
		filters.sortOption,
	);

	const gainersCount = filteredStocks.filter((s) => s.dayChangePercent > 0).length;
	const losersCount = filteredStocks.filter((s) => s.dayChangePercent < 0).length;

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredStocks.length}
			refreshIntervalText='Автообновление: 5 мин'
			onRefresh={refetch}
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
		fallback: <Skeleton height={40} />,
	},
});
