import {
	Group,
	SegmentedControl,
	Select,
	TextInput,
} from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import type {
	NotesSortOption,
	NotesSourceFilter,
} from '../model/note-filters';

import cls from '../notes-page.module.css';

type NotesControlsProps = {
	searchQuery: string;
	sourceFilter: NotesSourceFilter;
	sortOption: NotesSortOption;
	onSearchQueryChange: (value: string) => void;
	onSourceFilterChange: (value: NotesSourceFilter) => void;
	onSortOptionChange: (value: NotesSortOption) => void;
};

export function NotesControls({
	searchQuery,
	sourceFilter,
	sortOption,
	onSearchQueryChange,
	onSourceFilterChange,
	onSortOptionChange,
}: NotesControlsProps) {
	return (
		<Group gap='sm' align='center' justify='space-between'>
			<TextInput
				className={cls.searchInput}
				value={searchQuery}
				onChange={(event) => onSearchQueryChange(event.currentTarget.value)}
				placeholder='Поиск по заметкам и источникам'
				leftSection={<IconSearch size={16} />}
				size='sm'
			/>

			<Group gap='sm' className={cls.controlsRight}>
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

				<Select
					className={cls.sortSelect}
					value={sortOption}
					onChange={(value) => {
						if (value) {
							onSortOptionChange(value as NotesSortOption);
						}
					}}
					size='sm'
					allowDeselect={false}
					data={[
						{ label: 'Сначала новые', value: 'updated-desc' },
						{ label: 'Сначала старые', value: 'updated-asc' },
					]}
				/>
			</Group>
		</Group>
	);
}
