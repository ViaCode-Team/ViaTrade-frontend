import type { ReactNode } from 'react';

import { Group, Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { getGetAllByUserQueryOptions, getGetTradeRemindByUserInstrumentQueryOptions } from '@/entities/remind/api/gen';
import { useUrlFilters } from '@/shared/lib/hooks';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

import { defaultFilters, remindSortOptions } from '../model/filters';

type RemindsControlsProps = {
	actionSlot?: ReactNode;
	instrumentId?: number;
};

export function RemindsControls({ actionSlot, instrumentId }: RemindsControlsProps = {}) {
	const { filters, setFilter } = useUrlFilters(defaultFilters);

	const queryOpts = instrumentId
		? getGetTradeRemindByUserInstrumentQueryOptions(instrumentId)
		: getGetAllByUserQueryOptions();

	const { data } = useQuery(queryOpts);
	const disabled = data?.data?.length === 0;

	return (
		<ControlsGroup>
			<SearchInput
				value={filters.rq}
				onChange={(val) => setFilter('rq', val)}
				placeholder='Поиск напоминаний...'
				disabled={disabled}
			/>

			<Select
				data={remindSortOptions}
				value={filters.sort}
				onChange={(val) => setFilter('sort', val)}
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
