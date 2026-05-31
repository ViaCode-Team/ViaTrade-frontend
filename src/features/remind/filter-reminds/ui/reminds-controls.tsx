import type { ReactNode } from 'react';

import { Group, Select } from '@mantine/core';

import { useUrlFilters } from '@/shared/lib/hooks';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { defaultFilters, remindSortOptions } from '../model/filters';

type RemindsControlsProps = {
	actionSlot?: ReactNode;
};

export function RemindsControls({ actionSlot }: RemindsControlsProps = {}) {
	const { filters, setFilter } = useUrlFilters(defaultFilters);

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.rq}
				onChange={(val) => setFilter('rq', val)}
				placeholder='Поиск напоминаний...'
			/>

			<Select
				data={remindSortOptions}
				value={filters.sort}
				onChange={(val) => setFilter('sort', val)}
				w={{ base: '100%', sm: 220 }}
			/>

			{actionSlot && (
				<Group ml='auto'>
					{actionSlot}
				</Group>
			)}
		</ControlsGroup>
	);
}
