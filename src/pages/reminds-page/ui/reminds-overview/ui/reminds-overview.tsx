import { ActionIcon, Stack, Tooltip } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { brandGradient } from '@/app/providers/theme-provider/theme';
import { openAddRemindModal } from '@/features/remind/add-remind';
import { RemindsControls } from '@/features/remind/filter-reminds';
import { RemindStatusBarBoundary } from '@/features/remind/manage-reminds';
import { Section } from '@/shared/ui/section';

import { RemindsOverviewListBoundary } from './reminds-overview-list';
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
			<Section>
				<RemindsSummaryBoundary />
			</Section>

			<Section header={{ title: 'Список напоминаний' }}>
				<Stack gap='xs'>
					<RemindsControls actionSlot={actionSlot} />
					<RemindStatusBarBoundary />
				</Stack>

				<RemindsOverviewListBoundary />
			</Section>
		</>
	);
}
