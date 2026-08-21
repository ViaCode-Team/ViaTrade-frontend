import type { ReactNode } from 'react';

import { Group, SegmentedControl, Select } from '@mantine/core';

import {
	type ReminderDeliveryStatus,
	reminderDeliveryStatusOptions,
	remindFiltersSchema,
	remindSortOptions,
} from '@/entities/reminder';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

type RemindsControlsProps = {
	actionSlot?: ReactNode;
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

			<SegmentedControl
				data={reminderDeliveryStatusOptions}
				value={filters.deliveryStatus}
				onChange={(value) => setFilters({
					deliveryStatus: value as ReminderDeliveryStatus,
					page: '1',
				})}
				size='sm'
			/>
			{actionSlot && <Group ml='auto'>{actionSlot}</Group>}
		</ControlsGroup>
	);
}
