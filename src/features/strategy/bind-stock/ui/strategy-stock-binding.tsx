import { Stack } from '@mantine/core';
import { useMemo, useState } from 'react';

import {
	SelectableStockList,
	SelectableStockListSkeleton,
} from '@/entities/stock';
import {
	useCreateUserStrategyCode,
	useDeleteUserStrategyCode,
	useGetStocksByStrategySuspense,
} from '@/entities/strategy';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getFilteredStocks, getNextStockIdsAfterStockToggle, getStockSelectionState } from '../model';
import { ITEMS_PER_PAGE, useStrategyStockBindingData } from '../model/use-strategy-stock-binding';
import { StockBindingControls } from './stock-binding-controls';
import { StockBindingStatusBar } from './stock-binding-status-bar';

type StrategyStockBindingProps = {
	strategyId: number;
	searchPlaceholder?: string;
};

function StrategyStockBindingBase({
	strategyId,
	searchPlaceholder = 'Найти по коду или названию',
}: StrategyStockBindingProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const [page, setPage] = useState(1);

	const { stocks, totalPages, totalCount } = useStrategyStockBindingData(page);
	const visibleStocks = getFilteredStocks(stocks, searchQuery);
	const paginatedStocks = visibleStocks;

	const { data: linkedStocksResponse } = useGetStocksByStrategySuspense(strategyId, {
		page,
		pageSize: ITEMS_PER_PAGE,
		sortBy: ['nameAsc'],
	});
	const selectedStockIds = useMemo(
		() =>
			linkedStocksResponse.data.items.map((stock) => String(stock.id)),
		[linkedStocksResponse.data.items],
	);

	const { mutate: createLink } = useCreateUserStrategyCode();
	const { mutate: deleteLink } = useDeleteUserStrategyCode();

	const handleSelectedStockIdsChange = (nextStockIds: string[]) => {
		const added = nextStockIds.filter((id) => !selectedStockIds.includes(id));
		const removed = selectedStockIds.filter((id) => !nextStockIds.includes(id));

		added.forEach((id) => {
			createLink({ data: { strategyId, tradeCodeId: Number(id) } });
		});

		removed.forEach((id) => {
			deleteLink({ params: { strategyId, tradeCodeId: Number(id) } });
		});
	};

	const handleSearchQueryChange = (query: string) => {
		setSearchQuery(query);
		setPage(1);
	};

	const resetFilters = () => {
		setSearchQuery('');
		setPage(1);
	};

	return (
		<Stack gap='md'>
			<StockBindingControls
				searchPlaceholder={searchPlaceholder}
				searchQuery={searchQuery}
				onSearchQueryChange={handleSearchQueryChange}
				selectedStockIds={selectedStockIds}
				stocks={stocks}
				paginatedStocks={paginatedStocks}
				onSelectedStockIdsChange={handleSelectedStockIdsChange}
			/>

			<DataState
				hasData={!!stocks.length}
				hasResults={!!visibleStocks.length}
				onResetFilters={resetFilters}
			>
				<Stack gap='md'>
					<StockBindingStatusBar
						totalCount={totalCount}
						filteredCount={visibleStocks.length}
						selectedCount={getStockSelectionState(stocks, visibleStocks, selectedStockIds).selectedCount}
						pagination={{ page, pageSize: ITEMS_PER_PAGE, showRange: !searchQuery.trim() }}
					/>
					<SelectableStockList
						paginatedStocks={paginatedStocks}
						pagination={{ page, totalPages, onPageChange: setPage }}
						selectedStockIds={selectedStockIds}
						onStockChange={(stockId: string, checked: boolean) => {
							handleSelectedStockIdsChange(getNextStockIdsAfterStockToggle(selectedStockIds, stockId, checked));
						}}
					/>
				</Stack>
			</DataState>
		</Stack>
	);
}

export const StrategyStockBinding = withQueryBoundary(StrategyStockBindingBase, {
	suspenseProps: {
		fallback: <SelectableStockListSkeleton />,
	},
});
