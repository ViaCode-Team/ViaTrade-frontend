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
	const { filters, setFilters } = useStocksControls();

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.searchQuery}
				onChange={(val) => setFilters({ q: val, page: '1' })}
				placeholder='Найти по тикеру или названию'
				aria-label='Поиск акции'
				disabled={disabled}
				isLoading={isLoading}
			/>

			<Select
				data={stockSortOptions}
				value={filters.sortOption}
				onChange={(value) => value && setFilters({ listSort: value, page: '1' })}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>
		</ControlsGroup>
	);
}
