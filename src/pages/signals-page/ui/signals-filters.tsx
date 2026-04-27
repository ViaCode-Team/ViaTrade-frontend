import { Select, SimpleGrid, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import {
	type DirectionFilter,
	directionOptions,
	type SortOption,
	sortOptions,
	type TypeFilter,
	typeOptions,
} from '../model/signal-filters';

type SignalsFiltersProps = {
	searchQuery: string;
	sortOption: SortOption;
	directionFilter: DirectionFilter;
	typeFilter: TypeFilter;
	onSearchQueryChange: (value: string) => void;
	onSortOptionChange: (value: SortOption) => void;
	onDirectionFilterChange: (value: DirectionFilter) => void;
	onTypeFilterChange: (value: TypeFilter) => void;
};

export function SignalsFilters({
	searchQuery,
	sortOption,
	directionFilter,
	typeFilter,
	onSearchQueryChange,
	onSortOptionChange,
	onDirectionFilterChange,
	onTypeFilterChange,
}: SignalsFiltersProps) {
	return (
		<SimpleGrid minColWidth={280} spacing={{ base: 'sm', sm: 'lg' }}>
			<TextInput
				placeholder='Поиск по активу или стратегии...'
				value={searchQuery}
				onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
				leftSection={<IconSearch size={16} />}
			/>
			<Select
				data={sortOptions}
				value={sortOption}
				onChange={(value) => value && onSortOptionChange(value as SortOption)}
			/>
			<Select
				data={directionOptions}
				value={directionFilter}
				onChange={(value) => value && onDirectionFilterChange(value as DirectionFilter)}
			/>
			<Select
				data={typeOptions}
				value={typeFilter}
				onChange={(value) => value && onTypeFilterChange(value as TypeFilter)}
			/>
		</SimpleGrid>
	);
}
