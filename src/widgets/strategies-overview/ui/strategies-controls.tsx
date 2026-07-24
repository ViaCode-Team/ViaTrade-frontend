import { SegmentedControl, Select } from '@mantine/core';

import { useUrlFilters } from '@/shared/lib/url-filters';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import type { StrategySortOption, StrategyStatusFilter } from '../lib/filters';

import { strategyFiltersSchema, strategySortOptions } from '../lib/filters';

export type StrategiesControlsProps = {
	disabled?: boolean;
};

export function StrategiesControls({ disabled = false }: StrategiesControlsProps) {
	const { filters, setFilters } = useUrlFilters(strategyFiltersSchema);

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.q}
				onChange={(val) => setFilters({ q: val, page: '1' })}
				placeholder='Найти стратегию...'
				disabled={disabled}
			/>

			<Select
				data={strategySortOptions}
				value={filters.listSort}
				onChange={(val) => setFilters({ listSort: val as StrategySortOption, page: '1' })}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>

			<SegmentedControl
				value={filters.statusFilter}
				onChange={(val) => setFilters({ statusFilter: val as StrategyStatusFilter, page: '1' })}
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
