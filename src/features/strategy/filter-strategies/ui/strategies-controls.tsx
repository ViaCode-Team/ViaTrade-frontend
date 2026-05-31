import { SegmentedControl, Select } from '@mantine/core';

import { useGetAll } from '@/entities/strategy';
import { useUrlFilters } from '@/shared/lib/hooks';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { defaultFilters, strategySortOptions } from '../model/filters';

export function StrategiesControls() {
	const { filters, setFilter } = useUrlFilters(defaultFilters);

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
				value={filters.sort}
				onChange={(val) => setFilter('sort', val)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>

			<SegmentedControl
				value={filters.filter}
				onChange={(val) => setFilter('filter', val)}
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
