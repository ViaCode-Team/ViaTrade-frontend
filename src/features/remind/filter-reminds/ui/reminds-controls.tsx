import { ActionIcon, Group, Select, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';

import { useCreateInstrumentRemind } from '@/entities/remind/api/gen';
import { openAddRemindModal } from '@/features/remind/add-remind';
import { useUrlFilters } from '@/shared/lib/hooks';
import { brandGradient } from '@/shared/model/theme';
import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

export type RemindSortOption = 'date-asc' | 'date-desc';

const remindSortOptions = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
];

const defaultFilters = {
	rq: '',
	sort: 'date-desc' as RemindSortOption,
};

type RemindsControlsProps = {
	instrumentId?: number;
};

export function RemindsControls({ instrumentId }: RemindsControlsProps = {}) {
	const { filters, setFilter } = useUrlFilters(defaultFilters);

	const createRemindMutation = useCreateInstrumentRemind();

	const handleAddClick = () => {
		if (instrumentId) {
			const now = new Date();
			now.setSeconds(0, 0);
			now.setHours(now.getHours() + 3);

			createRemindMutation.mutate({
				idInstrument: instrumentId,
				data: {
					textRemind: 'Новое напоминание',
					dateTime: dayjs(now).format('YYYY-MM-DDTHH:mm:ss'),
				},
			});
		}
		else {
			openAddRemindModal();
		}
	};

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

			<Group ml='auto'>
				<Tooltip label='Добавить напоминание'>
					<ActionIcon
						variant='gradient'
						gradient={brandGradient}
						size='input-sm'
						aria-label='Добавить напоминание'
						onClick={handleAddClick}
						loading={createRemindMutation.isPending}
					>
						<IconPlus size={18} />
					</ActionIcon>
				</Tooltip>
			</Group>
		</ControlsGroup>
	);
}
