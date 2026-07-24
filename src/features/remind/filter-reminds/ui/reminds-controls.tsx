import type { ReactNode } from 'react';

import { Group, Select } from '@mantine/core';

import { remindFiltersSchema, remindSortOptions } from '@/entities/remind';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

type RemindsControlsProps = {
	actionSlot?: ReactNode;
	instrumentId?: number;
};

export function RemindsControls({ actionSlot }: RemindsControlsProps = {}) {
	const { filters, setFilters } = useUrlFilters(remindFiltersSchema);

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.q}
				onChange={(value) => setFilters({ q: value, page: '1' })}
				placeholder='Поиск напоминаний...'
			/>

			<Select
				data={remindSortOptions}
				value={filters.listSort}
				onChange={(value) => setFilters({ listSort: value, page: '1' })}
				w={{ base: '100%', sm: 220 }}
			/>
			{actionSlot && <Group ml='auto'>{actionSlot}</Group>}
		</ControlsGroup>
	);
}
