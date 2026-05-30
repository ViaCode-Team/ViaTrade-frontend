import { SegmentedControl, Select } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import {
	type DirectionFilter,
	directionOptions,
	type SortOption,
	sortOptions,
} from '../model/signal-filters';

type SignalsFiltersProps = {
	searchQuery: string;
	sortOption: SortOption;
	directionFilter: DirectionFilter;
	disabled?: boolean;
	isLoading?: boolean;
	onSearchQueryChange: (value: string) => void;
	onSortOptionChange: (value: SortOption) => void;
	onDirectionFilterChange: (value: DirectionFilter) => void;
};

export function SignalsFilters({
	searchQuery,
	sortOption,
	directionFilter,
	disabled,
	isLoading,
	onSearchQueryChange,
	onSortOptionChange,
	onDirectionFilterChange,
}: SignalsFiltersProps) {
	return (
		<ControlsGroup>
			<SearchInput
				placeholder='Поиск по активу или стратегии...'
				value={searchQuery}
				onChange={onSearchQueryChange}
				disabled={disabled}
				isLoading={isLoading}
			/>
			<Select
				data={sortOptions}
				value={sortOption}
				onChange={(value) => value && onSortOptionChange(value as SortOption)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>
			<SegmentedControl
				data={directionOptions}
				value={directionFilter}
				onChange={(value) => onDirectionFilterChange(value as DirectionFilter)}
				disabled={disabled}
			/>
		</ControlsGroup>
	);
}
