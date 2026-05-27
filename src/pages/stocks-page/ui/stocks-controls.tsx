import { SegmentedControl, Select } from '@mantine/core';

import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import {
	type StockSortOption,
	stockSortOptions,
	type StockTrendFilter,
} from '../model/stock-filters';

type StocksControlsProps = {
	searchQuery: string;
	sortOption: StockSortOption;
	trendFilter: StockTrendFilter;
	disabled?: boolean;
	isLoading?: boolean;
	onSearchQueryChange: (searchQuery: string) => void;
	onSortOptionChange: (sortOption: StockSortOption) => void;
	onTrendFilterChange: (trendFilter: StockTrendFilter) => void;
};

export function StocksControls({
	searchQuery,
	sortOption,
	trendFilter,
	disabled,
	isLoading,
	onSearchQueryChange,
	onSortOptionChange,
	onTrendFilterChange,
}: StocksControlsProps) {
	return (
		<FiltersGroup>
			<SearchInput
				value={searchQuery}
				onChange={onSearchQueryChange}
				placeholder='Найти по тикеру или названию'
				aria-label='Поиск акции'
				disabled={disabled}
				isLoading={isLoading}
			/>

			<Select
				data={stockSortOptions}
				value={sortOption}
				onChange={(value) => value && onSortOptionChange(value as StockSortOption)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>

			<SegmentedControl
				value={trendFilter}
				onChange={(value) => onTrendFilterChange(value as StockTrendFilter)}
				size='sm'
				data={[
					{ label: 'Все', value: 'all' },
					{ label: 'Растут', value: 'gainers' },
					{ label: 'Падают', value: 'losers' },
				]}
				disabled={disabled}
			/>
		</FiltersGroup>
	);
}
