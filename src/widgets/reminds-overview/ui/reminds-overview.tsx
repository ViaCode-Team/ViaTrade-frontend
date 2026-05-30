import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { openAddRemindModal } from '@/features/remind/add-remind';
import { RemindsControls } from '@/features/remind/filter-reminds';
import { RemindListBoundary, RemindStatusBarBoundary } from '@/features/remind/manage-reminds';
import { brandGradient } from '@/shared/model/theme';

import { RemindsSummaryBoundary } from './reminds-summary';

export function RemindsOverview() {
	const actionSlot = (
		<Tooltip label='Добавить напоминание'>
			<ActionIcon
				variant='gradient'
				gradient={brandGradient}
				size='input-sm'
				aria-label='Добавить напоминание'
				onClick={openAddRemindModal}
			>
				<IconPlus size={18} />
			</ActionIcon>
		</Tooltip>
	);

	return (
		<>
			<RemindsSummaryBoundary />

			<Stack>
				<Stack gap='xs'>
					<RemindsControls actionSlot={actionSlot} />
					<RemindStatusBarBoundary />
				</Stack>
				<RemindListBoundary />
			</Stack>
		</>
	);
}
