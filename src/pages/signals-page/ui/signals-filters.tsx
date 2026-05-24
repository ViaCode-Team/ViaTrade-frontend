import { Flex, Select, TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

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
	onSearchQueryChange: (value: string) => void;
	onSortOptionChange: (value: SortOption) => void;
	onDirectionFilterChange: (value: DirectionFilter) => void;
};

export function SignalsFilters({
	searchQuery,
	sortOption,
	directionFilter,
	onSearchQueryChange,
	onSortOptionChange,
	onDirectionFilterChange,
}: SignalsFiltersProps) {
	return (
		<Flex gap={{ base: 'sm', sm: 'lg' }} direction={{ base: 'column', sm: 'row' }}>
			<TextInput
				placeholder='Поиск по активу или стратегии...'
				value={searchQuery}
				onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
				leftSection={<IconSearch size={16} />}
				flex={1}
			/>
			<Select
				data={sortOptions}
				value={sortOption}
				onChange={(value) => value && onSortOptionChange(value as SortOption)}
				w={{ base: '100%', sm: 220 }}
			/>
			<Select
				data={directionOptions}
				value={directionFilter}
				onChange={(value) => value && onDirectionFilterChange(value as DirectionFilter)}
				w={{ base: '100%', sm: 200 }}
			/>
		</Flex>
	);
}
