import { SegmentedControl, Select } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import type { LinkedStrategyFilters } from './linked-strategy-filters';

import { linkedStrategySortOptions } from './linked-strategy-filters';

type LinkedStrategiesControlsProps = {
	filters: LinkedStrategyFilters;
	setFilter: <K extends keyof LinkedStrategyFilters>(key: K, value: LinkedStrategyFilters[K]) => void;
};

export function LinkedStrategiesControls({
	filters,
	setFilter,
}: LinkedStrategiesControlsProps) {
	return (
		<ControlsGroup>
			<SearchInput
				value={filters.searchQuery}
				onChange={(val) => setFilter('searchQuery', val)}
				placeholder='Найти стратегию...'
			/>

			<Select
				data={linkedStrategySortOptions}
				value={filters.sortOption}
				onChange={(val) => val && setFilter('sortOption', val as LinkedStrategyFilters['sortOption'])}
				w={{ base: '100%', sm: 220 }}
			/>

			<SegmentedControl
				value={filters.statusFilter}
				onChange={(val) => setFilter('statusFilter', val as LinkedStrategyFilters['statusFilter'])}
				size='sm'
				data={[
					{ label: 'Все', value: 'all' },
					{ label: 'Активные', value: 'active' },
					{ label: 'Неактивные', value: 'inactive' },
				]}
			/>
		</ControlsGroup>
	);
}
