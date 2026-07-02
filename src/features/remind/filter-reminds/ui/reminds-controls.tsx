import type { ReactNode } from 'react';

import { Group, Select } from '@mantine/core';

import { remindFiltersSchema, remindSortOptions } from '@/entities/remind';
import { useGetAllByUser, useGetByUserInstrument } from '@/entities/remind';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

type RemindsControlsProps = {
	actionSlot?: ReactNode;
	instrumentId?: number;
};

export function RemindsControls({ actionSlot, instrumentId }: RemindsControlsProps = {}) {
	const { filters, setFilter } = useUrlFilters(remindFiltersSchema);

	const allByUserQuery = useGetAllByUser({
		query: { enabled: instrumentId === undefined },
	});
	const instrumentQuery = useGetByUserInstrument(instrumentId ?? 0, {
		query: { enabled: instrumentId !== undefined },
	});

	const data = instrumentId === undefined ? allByUserQuery.data : instrumentQuery.data;
	const disabled = data?.data?.length === 0;

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.q}
				onChange={(val) => setFilter('q', val)}
				placeholder='Поиск напоминаний...'
				disabled={disabled}
			/>

			<Select
				data={remindSortOptions}
				value={filters.listSort}
				onChange={(val) => setFilter('listSort', val)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>

			{actionSlot && (
				<Group ml='auto'>
					{actionSlot}
				</Group>
			)}
		</ControlsGroup>
	);
}
