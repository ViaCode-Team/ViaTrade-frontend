import { SegmentedControl } from '@mantine/core';

import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { useNotesControls } from '../lib/use-notes-controls';

type NotesControlsProps = {
	disabled?: boolean;
	isLoading?: boolean;
};

export function NotesControls({ isLoading, disabled }: NotesControlsProps = {}) {
	const { filters, setFilter } = useNotesControls();


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
