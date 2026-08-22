import { Stack } from '@mantine/core';
import { useState } from 'react';

import {
	SelectableStockListSkeleton,
} from '@/entities/stock';
import {
	useAddInstrumentToStrategy,
	useDeleteInstrumentFromStrategy,
} from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getNextStockIdsAfterStockToggle } from '../model';
import { useStrategyLinkedStockIds } from '../model/use-strategy-linked-stock-ids';
import { StockBindingSearch } from './stock-binding-search';
import { StrategyStockBindingListBoundary } from './strategy-stock-binding-list';

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

	const selectedStockIds = useStrategyLinkedStockIds(strategyId);

	const { mutate: createLink } = useAddInstrumentToStrategy();
	const { mutate: deleteLink } = useDeleteInstrumentFromStrategy();

	const handleSelectedStockIdsChange = (nextStockIds: string[]) => {
		const added = nextStockIds.filter((id) => !selectedStockIds.includes(id));
		const removed = selectedStockIds.filter((id) => !nextStockIds.includes(id));

		added.forEach((id) => {
			createLink({ strategyId, instrumentId: Number(id) });
		});

		removed.forEach((id) => {
			deleteLink({ strategyId, instrumentId: Number(id) });
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
			<StockBindingSearch
				value={searchQuery}
				placeholder={searchPlaceholder}
				onChange={handleSearchQueryChange}
			/>

			<StrategyStockBindingListBoundary
				searchQuery={searchQuery}
				page={page}
				selectedStockIds={selectedStockIds}
				onPageChange={setPage}
				onResetFilters={resetFilters}
				onSelectedStockIdsChange={handleSelectedStockIdsChange}
				onStockChange={(stockId, checked) => {
					handleSelectedStockIdsChange(getNextStockIdsAfterStockToggle(selectedStockIds, stockId, checked));
				}}
			/>
		</Stack>
	);
}

export const StrategyStockBinding = withQueryBoundary(StrategyStockBindingBase, {
	suspenseProps: {
		fallback: <SelectableStockListSkeleton />,
	},
});
