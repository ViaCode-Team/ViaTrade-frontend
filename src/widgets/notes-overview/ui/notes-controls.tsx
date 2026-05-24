import {
	Group,
	SegmentedControl,
	TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import type { NotesSourceFilter } from '../model/note-filters';


type NotesControlsProps = {
	searchQuery: string;
	sourceFilter: NotesSourceFilter;
	onSearchQueryChange: (value: string) => void;
	onSourceFilterChange: (value: NotesSourceFilter) => void;
};

export function NotesControls({
	searchQuery,
	sourceFilter,
	onSearchQueryChange,
	onSourceFilterChange,
}: NotesControlsProps) {
	return (
		<Group gap='sm' align='center' justify='space-between'>
			<TextInput
				flex={1}
				value={searchQuery}
				onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
				placeholder='Поиск по заметкам и источникам'
				leftSection={<IconSearch size={16} />}
				size='sm'
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
			/>
		</Group>
	);
}
