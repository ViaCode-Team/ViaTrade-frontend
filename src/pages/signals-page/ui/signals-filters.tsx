import { Select } from '@mantine/core';

import { FiltersGroup } from '@/shared/ui/filters-group';
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
	onSearchQueryChange: (value: string) => void;
	onSortOptionChange: (value: SortOption) => void;
	onDirectionFilterChange: (value: DirectionFilter) => void;
};

export function SignalsFilters({
	searchQuery,
	sortOption,
	directionFilter,
	disabled,
	onSearchQueryChange,
	onSortOptionChange,
	onDirectionFilterChange,
}: SignalsFiltersProps) {
	return (
		<FiltersGroup>
			<SearchInput
				placeholder='Поиск по активу или стратегии...'
				value={searchQuery}
				onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
				disabled={disabled}
			/>
			<Select
				data={sortOptions}
				value={sortOption}
				onChange={(value) => value && onSortOptionChange(value as SortOption)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>
			<Select
				data={directionOptions}
				value={directionFilter}
				onChange={(value) => value && onDirectionFilterChange(value as DirectionFilter)}
				w={{ base: '100%', sm: 200 }}
				disabled={disabled}
			/>
		</FiltersGroup>
	);
}
