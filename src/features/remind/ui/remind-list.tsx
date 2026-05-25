import {
	ActionIcon,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Tooltip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { brandGradient } from '@/shared/model/theme';
import { EmptyState } from '@/shared/ui/empty-state';

import type {
	RemindEditableField,
	RemindItem,
} from '../model';

import { RemindCard } from './remind-card';
import cls from './remind-list.module.css';
import { RemindListSkeleton } from './remind-list.skeleton';

type RemindListProps = {
	reminds: RemindItem[];
	isLoading?: boolean;
	onRemindAdd: () => void;
	onRemindChange: (
		remindId: string,
		field: RemindEditableField,
		value: string,
	) => void;
	onRemindDuplicate: (remindId: string) => void;
	onRemindClearText: (remindId: string) => void;
	onRemindDelete: (remindId: string) => void;
	emptyText?: string;
};

export function RemindList({
	reminds,
	isLoading = false,
	onRemindAdd,
	onRemindChange,
	onRemindDuplicate,
	onRemindClearText,
	onRemindDelete,
	emptyText = 'Напоминаний пока нет',
}: RemindListProps) {
	const hasReminds = reminds.length > 0;

	return (
		<Stack gap='md'>
			<Group justify='space-between' gap='sm' wrap='nowrap' className={cls.header}>
				<Text size='sm' c='dimmed'>
					{isLoading
						? 'Загружаем напоминания'
						: `Всего напоминаний: ${reminds.length}`}
				</Text>

				<Tooltip label='Добавить напоминание'>
					<ActionIcon
						variant='gradient'
						gradient={brandGradient}
						size='xl'
						aria-label='Добавить напоминание'
						onClick={onRemindAdd}
					>
						<IconPlus size={18} />
					</ActionIcon>
				</Tooltip>
			</Group>

			{isLoading && !hasReminds
				? (
						<RemindListSkeleton />
					)
				: (
						<>
							{hasReminds && (
								<SimpleGrid
									minColWidth={300}
									spacing={CONTENT_GRID_SPACING}
									component='ul'
								>
									{reminds.map((remind) => (
										<li key={remind.id}>
											<RemindCard
												remind={remind}
												onRemindChange={onRemindChange}
												onRemindDuplicate={onRemindDuplicate}
												onRemindClearText={onRemindClearText}
												onRemindDelete={onRemindDelete}
											/>
										</li>
									))}
								</SimpleGrid>
							)}

							{!hasReminds && (
								<EmptyState title={emptyText} />
							)}
						</>
					)}
		</Stack>
	);
}
