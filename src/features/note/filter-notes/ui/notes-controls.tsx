import { SegmentedControl } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { useNotesControls } from '../lib/use-notes-controls';

export function NotesControls() {
	const { filters, setFilters } = useNotesControls();

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.searchQuery}
				onChange={(val) => setFilters({ q: val, page: '1' })}
				placeholder='Поиск заметок...'
				size='sm'
			/>

			<SegmentedControl
				value={filters.sourceFilter}
				onChange={(val) => setFilters({ sourceFilter: val, page: '1' })}
				size='sm'
				data={[
					{ label: 'Все', value: 'all' },
					{ label: 'Акции', value: 'stock' },
					{ label: 'Стратегии', value: 'strategy' },
				]}
			/>
		</ControlsGroup>
	);
}
