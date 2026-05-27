import { ActionIcon, Group, Select, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useSearchParams } from 'react-router';

import { useRemindContext } from '@/entities/remind';
import { brandGradient } from '@/shared/model/theme';
import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

export type RemindSortOption = 'date-asc' | 'date-desc';

const remindSortOptions = [
	{ value: 'date-desc', label: 'Сначала новые' },
	{ value: 'date-asc', label: 'Сначала старые' },
];

type RemindsControlsProps = {
	onAddClick?: () => void;
};

export function RemindsControls({ onAddClick }: RemindsControlsProps = {}) {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('rq') || '';
	const sortOption = (searchParams.get('sort') as RemindSortOption) || 'date-desc';
	const { onRemindAdd, reminds } = useRemindContext();
	const disabled = reminds.length === 0;

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
				disabled={disabled}
			/>

			<Select
				data={remindSortOptions}
				value={sortOption}
				onChange={(val) => updateSearchParams('sort', val)}
				w={{ base: '100%', sm: 220 }}
				disabled={disabled}
			/>

			<Group ml='auto'>
				<Tooltip label='Добавить напоминание'>
					<ActionIcon
						variant='gradient'
						gradient={brandGradient}
						size='input-sm'
						aria-label='Добавить напоминание'
						onClick={onAddClick || (() => onRemindAdd())}
					>
						<IconPlus size={18} />
					</ActionIcon>
				</Tooltip>
			</Group>
		</FiltersGroup>
	);
}
