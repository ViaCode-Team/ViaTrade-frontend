import { SimpleGrid, Stack } from '@mantine/core';
import { useState } from 'react';

import type { Stock } from '@/entities/trade-code/stock';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';

import {
	getFilteredStocks,
	getNextStockIdsAfterStockToggle,
	getNextStockIdsAfterVisibleToggle,
	getStockSelectionState,
} from '../model';
import { StockBindingCard } from './stock-binding-card';
import { StockBindingControls } from './stock-binding-controls';
import cls from './strategy-stock-binding-list.module.css';

type StrategyStockBindingListProps = {
	stocks: Stock[];
	selectedStockIds: string[];
	onSelectedStockIdsChange: (stockIds: string[]) => void;
	title?: string;
	searchPlaceholder?: string;
	emptyText?: string;
};

export function StrategyStockBindingList({
	stocks,
	selectedStockIds,
	onSelectedStockIdsChange,
	title = 'Связанные акции',
	searchPlaceholder = 'Найти по коду или названию',
	emptyText = 'Акции не найдены',
}: StrategyStockBindingListProps) {
	const [searchQuery, setSearchQuery] = useState('');
	const visibleStocks = getFilteredStocks(stocks, searchQuery);
	const selectedStockIdSet = new Set(selectedStockIds);
	const {
		selectedCount,
		allChecked,
		indeterminate,
	} = getStockSelectionState(stocks, visibleStocks, selectedStockIds);

	const handleAllChange = () => {
		onSelectedStockIdsChange(
			getNextStockIdsAfterVisibleToggle({
				stocks,
				visibleStocks,
				selectedStockIds,
				allChecked,
			}),
		);
	};

	const handleStockChange = (stockId: string, checked: boolean) => {
		onSelectedStockIdsChange(
			getNextStockIdsAfterStockToggle(stocks, selectedStockIds, stockId, checked),
		);
	};

	return (
		<Stack gap='md' component='section'>
			<StockBindingControls
				title={title}
				searchPlaceholder={searchPlaceholder}
				searchQuery={searchQuery}
				selectedCount={selectedCount}
				stocksCount={stocks.length}
				visibleStocksCount={visibleStocks.length}
				allChecked={allChecked}
				indeterminate={indeterminate}
				onSearchQueryChange={setSearchQuery}
				onAllChange={handleAllChange}
			/>

			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
				className={cls.grid}
			>
				{visibleStocks.map((stock) => (
					<li key={stock.id} className={cls.item}>
						<StockBindingCard
							stock={stock}
							isSelected={selectedStockIdSet.has(stock.id)}
							onSelectedChange={handleStockChange}
						/>
					</li>
				))}
			</SimpleGrid>

			{visibleStocks.length === 0 && (
				<EmptyState title={emptyText} />
			)}
		</Stack>
	);
}
