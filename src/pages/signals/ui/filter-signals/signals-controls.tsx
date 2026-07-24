import { SegmentedControl, Select } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { directionOptions, sortOptions } from './signal-filters';
import { useSignalsControls } from './use-signals-controls';

export function SignalsControls() {
	const { filters, setFilter } = useSignalsControls();

	return (
		<ControlsGroup>
			<SearchInput
				placeholder='Поиск сигнала...'
				value={filters.searchQuery}
				onChange={(val) => setFilter('q', val)}
			/>
			<Select
				data={sortOptions}
				value={filters.sortOption}
				onChange={(val) => val && setFilter('listSort', val)}
				w={{ base: '100%', sm: 220 }}
			/>
			<SegmentedControl
				data={directionOptions}
				value={filters.directionFilter}
				onChange={(val) => setFilter('directionFilter', val)}
			/>
		</ControlsGroup>
	);
}
