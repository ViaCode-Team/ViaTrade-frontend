import {
	Checkbox,
	Flex,
} from '@mantine/core';

import type { Stock } from '@/entities/stock';

import { getNextStockIdsAfterVisibleToggle, getStockSelectionState } from '../model';

type StockBindingSelectionControlsProps = {
	selectedStockIds: string[];
	onSelectedStockIdsChange: (stockIds: string[]) => void;
	stocks: Stock[];
	paginatedStocks: Stock[];
};

export function StockBindingSelectionControls({
	selectedStockIds,
	onSelectedStockIdsChange,
	stocks,
	paginatedStocks,
}: StockBindingSelectionControlsProps) {
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
		<Flex align='center' gap={4} wrap='wrap'>
			<Checkbox
				checked={allChecked}
				indeterminate={indeterminate}
				onChange={handleAllChange}
				label='Выбрать все на странице'
				size='md'
				disabled={paginatedStocks.length === 0}
			/>
		</Flex>
	);
}
