import { Select } from '@mantine/core';

import { stockSortOptions } from '@/entities/stock';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { useStocksControls } from './use-stocks-controls';

type StocksControlsProps = {
	disabled?: boolean;
	isLoading?: boolean;
};

export function StocksControls({ disabled, isLoading }: StocksControlsProps) {
	const { filters, setFilter } = useStocksControls();

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.searchQuery}
				onChange={(val) => setFilter('q', val)}
				placeholder='Найти по тикеру или названию'
				aria-label='Поиск акции'
				disabled={disabled}
				isLoading={isLoading}
			/>

			<Select
				data={stockSortOptions}
				value={filters.sortOption}
				onChange={(value) => value && setFilter('listSort', value)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>
		</ControlsGroup>
	);
}
