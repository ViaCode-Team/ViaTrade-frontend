import type { ReactNode } from 'react';

import { Group, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { getGetAllByUserQueryOptions, getGetTradeRemindByUserInstrumentQueryOptions } from '@/entities/remind';
import { remindFiltersSchema, remindSortOptions } from '@/entities/remind';
import { useUrlFilters } from '@/shared/lib/hooks';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

type RemindsControlsProps = {
	actionSlot?: ReactNode;
	instrumentId?: number;
};

export function RemindsControls({ actionSlot, instrumentId }: RemindsControlsProps = {}) {
	const { filters, setFilter } = useUrlFilters(remindFiltersSchema);

	const queryOpts = instrumentId
		? getGetTradeRemindByUserInstrumentQueryOptions(instrumentId)
		: getGetAllByUserQueryOptions();

	const { data } = useQuery(queryOpts);
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
