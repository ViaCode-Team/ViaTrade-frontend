import {
	Checkbox,
	Flex,
	Stack,
} from '@mantine/core';

import type { Stock } from '@/entities/stock';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { getNextStockIdsAfterVisibleToggle, getStockSelectionState } from '../model';

type StockBindingControlsProps = {
	searchPlaceholder?: string;
	searchQuery: string;
	onSearchQueryChange: (query: string) => void;
	selectedStockIds: string[];
	onSelectedStockIdsChange: (stockIds: string[]) => void;
	stocks: Stock[];
	paginatedStocks: Stock[];
};

export function StockBindingControls({
	searchPlaceholder = 'Найти акцию',
	searchQuery,
	onSearchQueryChange,
	selectedStockIds,
	onSelectedStockIdsChange,
	stocks,
	paginatedStocks,
}: StockBindingControlsProps) {
	const isLoading = false;

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
