import { SegmentedControl } from '@mantine/core';

import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import type { NotesSourceFilter } from '../model/note-filters';


type NotesControlsProps = {
	searchQuery: string;
	sourceFilter: NotesSourceFilter;
	disabled?: boolean;
	onSearchQueryChange: (value: string) => void;
	onSourceFilterChange: (value: NotesSourceFilter) => void;
};

export function NotesControls({
	searchQuery,
	sourceFilter,
	disabled,
	onSearchQueryChange,
	onSourceFilterChange,
}: NotesControlsProps) {
	return (
		<FiltersGroup>
			<SearchInput
				value={searchQuery}
				onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
				placeholder='Поиск по заметкам и источникам'
				size='sm'
				disabled={disabled}
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
