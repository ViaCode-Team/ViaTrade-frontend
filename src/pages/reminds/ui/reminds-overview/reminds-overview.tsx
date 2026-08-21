import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { openCreateRemindModal } from '@/features/remind/create-remind';
import { RemindsControls } from '@/features/remind/filter-reminds';
import { brandGradient } from '@/shared/lib/theme';

import { RemindsOverviewListBoundary } from './reminds-overview-list';

const actionSlot = (
	<Tooltip label='Добавить напоминание'>
		<ActionIcon
			variant='gradient'
			gradient={brandGradient}
			size='input-sm'
			aria-label='Добавить напоминание'
			onClick={() => openCreateRemindModal()}
		>
			<IconPlus size={18} />
		</ActionIcon>
	</Tooltip>
);

export function RemindsOverview() {
	return (
		<Stack>
			<RemindsControls actionSlot={actionSlot} />

			<RemindsOverviewListBoundary />
		</Stack>
	);
}
