import { SegmentedControl, Select } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { useSignalsControls } from '../lib/use-signals-controls';
import { directionOptions, sortOptions } from '../model/signal-filters';

type SignalsControlsProps = {
	disabled?: boolean;
	isLoading?: boolean;
};

export function SignalsControls({ disabled, isLoading }: SignalsControlsProps) {
	const { filters, setFilter } = useSignalsControls();

	return (
		<ControlsGroup>
			<SearchInput
				placeholder='Поиск сигнала...'
				value={filters.searchQuery}
				onChange={(val) => setFilter('q', val)}
				disabled={disabled}
				isLoading={isLoading}
			/>
			<Select
				data={sortOptions}
				value={filters.sortOption}
				onChange={(val) => val && setFilter('listSort', val)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>
			<SegmentedControl
				data={directionOptions}
				value={filters.directionFilter}
				onChange={(val) => setFilter('directionFilter', val)}
				disabled={disabled}
			/>
		</ControlsGroup>
	);
}
