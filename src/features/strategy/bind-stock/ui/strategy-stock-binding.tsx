import { Stack } from '@mantine/core';
import { useState } from 'react';

import {
	StrategyStockBindingList,
	StrategyStockBindingListSkeleton,
} from '@/entities/trade-code/stock';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getFilteredStocks, getNextStockIdsAfterStockToggle } from '../model';
import { ITEMS_PER_PAGE, useStrategyStockBindingData } from '../model/use-strategy-stock-binding';
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

	const handleSearchQueryChange = (query: string) => {
		setSearchQuery(query);
		setPage(1);
	};

	const { stocks } = useStrategyStockBindingData();
	const visibleStocks = getFilteredStocks(stocks, searchQuery);
	const totalPages = Math.ceil(visibleStocks.length / ITEMS_PER_PAGE);
	const paginatedStocks = visibleStocks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	return (
		<Stack gap='md'>
			<Stack gap='xs'>
				<StockBindingControls
					searchPlaceholder={searchPlaceholder}
					searchQuery={searchQuery}
					onSearchQueryChange={handleSearchQueryChange}
					page={page}
					selectedStockIds={selectedStockIds}
					onSelectedStockIdsChange={onSelectedStockIdsChange}
				/>

				<StockBindingStatusBarBoundary
					searchQuery={searchQuery}
					selectedStockIds={selectedStockIds}
				/>
			</Stack>

			<StrategyStockBindingList
				paginatedStocks={paginatedStocks}
				stocks={stocks}
				page={page}
				totalPages={totalPages}
				selectedStockIds={selectedStockIds}
				onStockChange={(stockId: string, checked: boolean) => {
					onSelectedStockIdsChange(getNextStockIdsAfterStockToggle(stocks, selectedStockIds, stockId, checked));
				}}
				onPageChange={setPage}
			/>
		</Stack>
	);
}

export const StrategyStockBinding = withQueryBoundary(StrategyStockBindingBase, {
	suspenseProps: {
		fallback: <StrategyStockBindingListSkeleton />,
	},
});
