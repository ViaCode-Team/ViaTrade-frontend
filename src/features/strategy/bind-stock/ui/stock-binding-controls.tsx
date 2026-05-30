import {
	Checkbox,
	Flex,
	Stack,
} from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { getFilteredStocks, getNextStockIdsAfterVisibleToggle, getStockSelectionState } from '../model';
import { ITEMS_PER_PAGE, useStrategyStockBindingDataQuery } from '../model/use-strategy-stock-binding';

type StockBindingControlsProps = {
	searchPlaceholder?: string;
	searchQuery: string;
	onSearchQueryChange: (query: string) => void;
	page: number;
	selectedStockIds: string[];
	onSelectedStockIdsChange: (stockIds: string[]) => void;
};

export function StockBindingControls({
	searchPlaceholder = 'Найти акцию',
	searchQuery,
	onSearchQueryChange,
	page,
	selectedStockIds,
	onSelectedStockIdsChange,
}: StockBindingControlsProps) {
	const { stocks, isLoading } = useStrategyStockBindingDataQuery();
	const visibleStocks = getFilteredStocks(stocks, searchQuery);
	const paginatedStocks = visibleStocks.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

	const { allChecked, indeterminate } = getStockSelectionState(stocks, paginatedStocks, selectedStockIds);

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

	return (
		<Flex justify='space-between' gap='md' wrap='wrap'>
			<Stack gap='md' w='100%'>
				<ControlsGroup>
					<SearchInput
						value={searchQuery}
						onChange={onSearchQueryChange}
						placeholder={searchPlaceholder}
						aria-label='Поиск акции'
						disabled={isLoading || stocks.length === 0}
					/>

					<Flex align='center' gap={4} wrap='wrap'>
						<Checkbox
							checked={allChecked}
							indeterminate={indeterminate}
							onChange={handleAllChange}
							label={searchQuery.trim() ? 'Выбрать все найденные на странице' : 'Выбрать все на странице'}
							size='md'
							disabled={isLoading || paginatedStocks.length === 0}
						/>
					</Flex>
				</ControlsGroup>
			</Stack>
		</Flex>
	);
}
