import { Stack } from '@mantine/core';

import { SelectableStockList, SelectableStockListSkeleton } from '@/entities/stock';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getStockSelectionState } from '../model';
import { ITEMS_PER_PAGE, useStrategyStockBindingData } from '../model/use-strategy-stock-binding';
import { StockBindingSelectionControls } from './stock-binding-selection-controls';
import { StockBindingStatusBar } from './stock-binding-status-bar';

type StrategyStockBindingListProps = {
	searchQuery: string;
	page: number;
	selectedStockIds: string[];
	onPageChange: (page: number) => void;
	onResetFilters: () => void;
	onSelectedStockIdsChange: (stockIds: string[]) => void;
	onStockChange: (stockId: string, checked: boolean) => void;
};

function StrategyStockBindingList({
	searchQuery,
	page,
	selectedStockIds,
	onPageChange,
	onResetFilters,
	onSelectedStockIdsChange,
	onStockChange,
}: StrategyStockBindingListProps) {
	const { stocks, totalPages, totalCount } = useStrategyStockBindingData(searchQuery, page);

	return (
		<DataState
			hasData={!!totalCount || Boolean(searchQuery.trim())}
			hasResults={!!stocks.length}
			onResetFilters={onResetFilters}
		>
			<Stack gap='md'>
				<StockBindingSelectionControls
					selectedStockIds={selectedStockIds}
					onSelectedStockIdsChange={onSelectedStockIdsChange}
					stocks={stocks}
					paginatedStocks={stocks}
				/>

				<StockBindingStatusBar
					totalCount={totalCount}
					filteredCount={stocks.length}
					selectedCount={getStockSelectionState(stocks, stocks, selectedStockIds).selectedCount}
					pagination={{
						page,
						pageSize: ITEMS_PER_PAGE,
						totalPages,
						onPageChange,
					}}
				/>

				<SelectableStockList
					paginatedStocks={stocks}
					pagination={{ page, totalPages, onPageChange }}
					selectedStockIds={selectedStockIds}
					onStockChange={onStockChange}
				/>
			</Stack>
		</DataState>
	);
}

export const StrategyStockBindingListBoundary = withQueryBoundary(StrategyStockBindingList, {
	suspenseProps: {
		fallback: <SelectableStockListSkeleton />,
	},
});
