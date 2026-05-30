import { SegmentedControl, Select } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { useStocksControls } from '../lib/use-stocks-controls';
import { stockSortOptions } from '../model/stock-filters';

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
				onChange={(value) => value && setFilter('sort', value)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>

			<SegmentedControl
				value={filters.trendFilter}
				onChange={(value) => setFilter('trend', value)}
				size='sm'
				data={[
					{ label: 'Все', value: 'all' },
					{ label: 'Растут', value: 'gainers' },
					{ label: 'Падают', value: 'losers' },
				]}
				disabled={disabled}
			/>
		</ControlsGroup>
	);
}
