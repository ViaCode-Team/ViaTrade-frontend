import { SegmentedControl, Select } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';

import { directionOptions, sortOptions } from './signal-filters';
import { useSignalsControls } from './use-signals-controls';

export function SignalsControls() {
	const { filters, setDirectionFilter, setSortOption } = useSignalsControls();

	return (
		<ControlsGroup>
			<Select
				data={sortOptions}
				value={filters.sortOption}
				onChange={(val) => val && setSortOption(val as typeof filters.sortOption)}
				w={{ base: '100%', sm: 220 }}
			/>
			<SegmentedControl
				data={directionOptions}
				value={filters.directionFilter}
				onChange={(val) => setDirectionFilter(val as typeof filters.directionFilter)}
			/>
		</ControlsGroup>
	);
}
