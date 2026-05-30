import { SegmentedControl, Select } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import type { LinkedStrategyFilters } from '../model/linked-strategy-filters';

import { linkedStrategySortOptions } from '../model/linked-strategy-filters';

type LinkedStrategiesControlsProps = {
	filters: LinkedStrategyFilters;
	setFilter: <K extends keyof LinkedStrategyFilters>(key: K, value: LinkedStrategyFilters[K]) => void;
	disabled?: boolean;
};

export function LinkedStrategiesControls({
	filters,
	setFilter,
	disabled,
}: LinkedStrategiesControlsProps) {
	return (
		<ControlsGroup>
			<SearchInput
				value={filters.searchQuery}
				onChange={(val) => setFilter('searchQuery', val)}
				placeholder='Найти стратегию...'
				disabled={disabled}
			/>

			<Select
				data={linkedStrategySortOptions}
				value={filters.sortOption}
				onChange={(val) => val && setFilter('sortOption', val as LinkedStrategyFilters['sortOption'])}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
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
				disabled={disabled}
			/>
		</ControlsGroup>
	);
}
