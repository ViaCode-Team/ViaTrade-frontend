import { Badge, Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getFilteredStocks, getStockSelectionState } from '../model';
import { useStrategyStockBindingData } from '../model/use-strategy-stock-binding';

type StockBindingStatusBarProps = {
	searchQuery: string;
	selectedStockIds: string[];
};

export function StockBindingStatusBar({
	searchQuery,
	selectedStockIds,
}: StockBindingStatusBarProps) {
	const { stocks } = useStrategyStockBindingData();
	const visibleStocks = getFilteredStocks(stocks, searchQuery);

	const { selectedCount } = getStockSelectionState(stocks, visibleStocks, selectedStockIds);

	return (
		<ListStatusBar
			totalCount={stocks.length}
			filteredCount={visibleStocks.length}
			badges={(
				<>
					{selectedCount > 0 && (
						<Badge variant='light' color='blue' size='sm' style={{ textTransform: 'none' }}>
							Выбрано:
							{' '}
							{selectedCount}
						</Badge>
					)}
				</>
			)}
		/>
	);
}

export const StockBindingStatusBarBoundary = withQueryBoundary(StockBindingStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={20} width='100%' />,

	},
});
