import { MultiSelect, Select } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';

import { signalOptions, sortOptions } from './signal-filters';
import { useSignalsControls } from './use-signals-controls';

export function SignalsControls() {
	const { filters, setSignalsFilter, setSortOption } = useSignalsControls();

	return (
		<ControlsGroup>
			<Select
				data={sortOptions}
				value={filters.sortOption}
				onChange={(val) => val && setSortOption(val as typeof filters.sortOption)}
				w={{ base: '100%', sm: 220 }}
			/>
			<MultiSelect
				data={signalOptions}
				value={filters.signalsFilter}
				onChange={(val) => setSignalsFilter(val as typeof filters.signalsFilter)}
				placeholder='Выберите типы'
				w={{ base: '100%', sm: 'auto' }}
			/>
		</ControlsGroup>
	);
}
