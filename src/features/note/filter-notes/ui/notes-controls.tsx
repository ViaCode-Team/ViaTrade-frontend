import { SegmentedControl } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';
import { usePersonalNotes } from '@/widgets/notes-overview';

import { useNotesControls } from '../lib/use-notes-controls';

type NotesControlsProps = {
	isLoading?: boolean;
};

export function NotesControls({ isLoading }: NotesControlsProps = {}) {
	const { filters, setFilter } = useNotesControls();
	const { notes } = usePersonalNotes();
	const disabled = notes.length === 0;

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.searchQuery}
				onChange={(val) => setFilter('q', val)}
				placeholder='Поиск заметок...'
				size='sm'
				disabled={disabled}
				isLoading={isLoading}
			/>

			<SegmentedControl
				value={filters.sourceFilter}
				onChange={(val) => setFilter('sourceFilter', val)}
				size='sm'
				data={[
					{ label: 'Все', value: 'all' },
					{ label: 'Акции', value: 'stock' },
					{ label: 'Стратегии', value: 'strategy' },
				]}
				disabled={disabled}
			/>
		</ControlsGroup>
	);
}
