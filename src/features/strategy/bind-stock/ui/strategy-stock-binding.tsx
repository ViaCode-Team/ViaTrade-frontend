import { Stack } from '@mantine/core';
import { useState } from 'react';

import { StockBindingControls } from './stock-binding-controls';
import { StockBindingStatusBarBoundary } from './stock-binding-status-bar';
import { StrategyStockBindingListBoundary } from './strategy-stock-binding-list';

type StrategyStockBindingProps = {
	selectedStockIds: string[];
	onSelectedStockIdsChange: (stockIds: string[]) => void;
	searchPlaceholder?: string;
};

export function StrategyStockBinding({
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

			<StrategyStockBindingListBoundary
				searchQuery={searchQuery}
				page={page}
				selectedStockIds={selectedStockIds}
				onStockChange={onSelectedStockIdsChange}
				onPageChange={setPage}
			/>
		</Stack>
	);
}
