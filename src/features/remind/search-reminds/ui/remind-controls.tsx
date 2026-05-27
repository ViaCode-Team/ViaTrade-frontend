import { ActionIcon, Group, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useSearchParams } from 'react-router';

import { useRemindContext } from '@/entities/remind';
import { brandGradient } from '@/shared/model/theme';
import { FiltersGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

export function RemindsControls() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchQuery = searchParams.get('rq') || '';
	const { onRemindAdd, reminds } = useRemindContext();
	const disabled = reminds.length === 0;

	const handleSearchChange = (query: string) => {
		setSearchParams((prev) => {
			if (query) {
				prev.set('rq', query);
			}
			else {
				prev.delete('rq');
			}
			return prev;
		});
	};

	return (
		<FiltersGroup>
			<SearchInput
				value={searchQuery}
				onChange={(event) => handleSearchChange(event.currentTarget.value)}
				placeholder='Поиск напоминаний...'
				disabled={disabled}
			/>

			<Group ml='auto'>
				<Tooltip label='Добавить напоминание'>
					<ActionIcon
						variant='gradient'
						gradient={brandGradient}
						size='input-sm'
						aria-label='Добавить напоминание'
						onClick={onRemindAdd}
					>
						<IconPlus size={18} />
					</ActionIcon>
				</Tooltip>
			</Group>
		</FiltersGroup>
	);
}
