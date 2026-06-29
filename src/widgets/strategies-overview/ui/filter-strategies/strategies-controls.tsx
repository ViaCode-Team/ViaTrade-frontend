import { SegmentedControl, Select } from '@mantine/core';

import { useGetAll } from '@/entities/strategy';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import type { StrategySortOption, StrategyStatusFilter } from './filters';

import { strategyFiltersSchema, strategySortOptions } from './filters';

export function StrategiesControls() {
	const { filters, setFilter } = useUrlFilters(strategyFiltersSchema);

	const { data, isLoading } = useGetAll();
	const disabled = isLoading || (data?.data.length === 0);

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.q}
				onChange={(val) => setFilter('q', val)}
				placeholder='Найти стратегию...'
				disabled={disabled}
				isLoading={isLoading}
			/>

			<Select
				data={strategySortOptions}
				value={filters.listSort}
				onChange={(val) => setFilter('listSort', val as StrategySortOption)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>

			<SegmentedControl
				value={filters.statusFilter}
				onChange={(val) => setFilter('statusFilter', val as StrategyStatusFilter)}
				size='sm'
				data={[
					{ label: 'Все', value: 'all' },
					{ label: 'Активные', value: 'active' },
					{ label: 'Неактивные', value: 'inactive' },
				]}
				disabled={disabled}
			/>
		</ControlsGroup>
	);
}
