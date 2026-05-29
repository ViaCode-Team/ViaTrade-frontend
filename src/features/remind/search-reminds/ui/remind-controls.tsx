import { ActionIcon, Group, Select, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useSearchParams } from 'react-router';

import { useCreateInstrumentRemind } from '@/entities/remind/api/gen';
import { openAddRemindModal } from '@/features/remind/add-remind';
import { brandGradient } from '@/shared/model/theme';
import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

export type RemindSortOption = 'date-asc' | 'date-desc';

const remindSortOptions = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
];

type RemindsControlsProps = {
	instrumentId?: number;
};

export function RemindsControls({ instrumentId }: RemindsControlsProps = {}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('rq') || '';
	const sortOption = (searchParams.get('sort') as RemindSortOption) || 'date-desc';

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

	const updateSearchParams = (key: string, value: string | null) => {
		setSearchParams((prev) => {
			if (value && value !== 'date-desc') {
				prev.set(key, value);
			}
			else {
				prev.delete(key);
			}
			return prev;
		});
	};

	return (
		<FiltersGroup>
			<SearchInput
				value={searchQuery}
				onChange={(val) => updateSearchParams('rq', val)}
				placeholder='Поиск напоминаний...'
			/>

			<Select
				data={remindSortOptions}
				value={sortOption}
				onChange={(val) => updateSearchParams('sort', val)}
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
		</FiltersGroup>
	);
}
