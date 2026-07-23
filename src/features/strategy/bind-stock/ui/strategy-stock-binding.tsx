import { Stack } from '@mantine/core';
import { useState } from 'react';

import {
	StrategyStockBindingList,
	StrategyStockBindingListSkeleton,
} from '@/entities/stock';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getFilteredStocks, getNextStockIdsAfterStockToggle, getStockSelectionState } from '../model';
import { useStrategyStockBindingData } from '../model/use-strategy-stock-binding';
import { StockBindingControls } from './stock-binding-controls';
import { StockBindingStatusBarBoundary } from './stock-binding-status-bar';

type StrategyStockBindingProps = {
	selectedStockIds: string[];
	onSelectedStockIdsChange: (stockIds: string[]) => void;
	searchPlaceholder?: string;
};

function StrategyStockBindingBase({
	selectedStockIds,
	onSelectedStockIdsChange,
	searchPlaceholder = 'Найти по коду или названию',
}: StrategyStockBindingProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(1);

	const { stocks, totalPages, totalCount } = useStrategyStockBindingData(page);
	const visibleStocks = getFilteredStocks(stocks, searchQuery);
	const paginatedStocks = visibleStocks;

	const handleSearchQueryChange = (query: string) => {
		setSearchQuery(query);
		setPage(1);
	};

	return (
		<Stack gap='md'>
			<Stack gap='xs'>
				<StockBindingControls
					searchPlaceholder={searchPlaceholder}
					searchQuery={searchQuery}
					onSearchQueryChange={handleSearchQueryChange}
					selectedStockIds={selectedStockIds}
					stocks={stocks}
					paginatedStocks={paginatedStocks}
					onSelectedStockIdsChange={onSelectedStockIdsChange}
				/>

				<StockBindingStatusBarBoundary totalCount={totalCount} filteredCount={visibleStocks.length} selectedCount={getStockSelectionState(stocks, visibleStocks, selectedStockIds).selectedCount} />
			</Stack>

			<DataState hasData={!!stocks.length} hasResults={!!visibleStocks.length}>
				<StrategyStockBindingList
					paginatedStocks={paginatedStocks}
					stocks={stocks}
					pagination={{ page, totalPages, onPageChange: setPage }}
					selectedStockIds={selectedStockIds}
					onStockChange={(stockId: string, checked: boolean) => {
						onSelectedStockIdsChange(getNextStockIdsAfterStockToggle(selectedStockIds, stockId, checked));
					}}
				/>
			</DataState>
		</Stack>
	);
}

export const StrategyStockBinding = withQueryBoundary(StrategyStockBindingBase, {
	suspenseProps: {
		fallback: <StrategyStockBindingListSkeleton />,
	},
});
