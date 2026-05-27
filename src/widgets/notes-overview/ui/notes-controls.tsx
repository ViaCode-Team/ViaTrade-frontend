import { SegmentedControl } from '@mantine/core';

import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import type { NotesSourceFilter } from '../model/note-filters';

type NotesControlsProps = {
	searchQuery: string;
	sourceFilter: NotesSourceFilter;
	disabled?: boolean;
	isLoading?: boolean;
	onSearchQueryChange: (value: string) => void;
	onSourceFilterChange: (value: NotesSourceFilter) => void;
};

export function NotesControls({
	searchQuery,
	sourceFilter,
	disabled,
	isLoading,
	onSearchQueryChange,
	onSourceFilterChange,
}: NotesControlsProps) {
	return (
		<FiltersGroup>
			<SearchInput
				value={searchQuery}
				onChange={onSearchQueryChange}
				placeholder='Поиск по заметкам и источникам'
				size='sm'
				disabled={disabled}
				isLoading={isLoading}
			/>

			<SegmentedControl
				value={sourceFilter}
				onChange={(value) => onSourceFilterChange(value as NotesSourceFilter)}
				size='sm'
				data={[
					{ label: 'Все', value: 'all' },
					{ label: 'Акции', value: 'stock' },
					{ label: 'Стратегии', value: 'strategy' },
				]}
				disabled={disabled}
			/>
		</FiltersGroup>
	);
}
