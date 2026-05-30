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
import { StockBindingStatusBar } from './stock-binding-status-bar';
import cls from './strategy-stock-binding-list.module.css';

const ITEMS_PER_PAGE = 12;

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
	const [page, setPage] = useState(1);

	const visibleStocks = getFilteredStocks(stocks, searchQuery);

	const totalPages = Math.ceil(visibleStocks.length / ITEMS_PER_PAGE);
	const paginatedStocks = visibleStocks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	const selectedStockIdSet = new Set(selectedStockIds);
	const {
		selectedCount,
		allChecked,
		indeterminate,
	} = getStockSelectionState(stocks, paginatedStocks, selectedStockIds);

	const handleAllChange = () => {
		onSelectedStockIdsChange(
			getNextStockIdsAfterVisibleToggle({
				stocks,
				visibleStocks: paginatedStocks,
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
				stocksCount={stocks.length}
				visibleStocksCount={paginatedStocks.length}
				allChecked={allChecked}
				indeterminate={indeterminate}
				onSearchQueryChange={(query) => {
					setSearchQuery(query);
					setPage(1);
				}}
				onAllChange={handleAllChange}
			/>

			<StockBindingStatusBar
				totalCount={stocks.length}
				filteredCount={visibleStocks.length}
				selectedCount={selectedCount}
				page={page}
				totalPages={totalPages}
				onPageChange={setPage}
			/>

			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{paginatedStocks.map((stock) => (
					<li key={stock.id} className={cls.item}>
						<StockBindingCard
							stock={stock}
							isSelected={selectedStockIdSet.has(stock.id)}
							onSelectedChange={handleStockChange}
						/>
					</li>
				))}
			</SimpleGrid>

			{paginatedStocks.length === 0 && (
				<EmptyState title={emptyText} />
			)}
		</Stack>
	);
}
