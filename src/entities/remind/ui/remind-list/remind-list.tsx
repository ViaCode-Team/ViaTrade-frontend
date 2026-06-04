import { SimpleGrid, Stack } from '@mantine/core';

import { RemindCard, type RemindItem } from '@/entities/remind';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';

import cls from './remind-list.module.css';

export { RemindListSkeleton } from './remind-list.skeleton';

export type RemindListProps = {
	reminds: RemindItem[];
	hasAnyReminds: boolean;
	hideSourceBadge?: boolean;
	onRemindChange: (
		remindId: string,
		updates: { text: string; date: string; time: string },
		onSuccess?: () => void,
	) => void;
	actionSlot?: (remind: RemindItem) => React.ReactNode;
};

export function RemindList({
	reminds,
	hasAnyReminds,
	hideSourceBadge,
	onRemindChange,
	actionSlot,
}: RemindListProps) {
	const hasFilteredReminds = reminds.length > 0;

	if (!hasAnyReminds) {
		return <EmptyState title='Напоминаний нет' description='Создайте первое напоминание, чтобы ничего не пропустить.' />;
	}

	if (!hasFilteredReminds) {
		return <EmptyState title='Ничего не найдено' description='Очистите строку поиска или измените фильтры.' />;
	}

	return (
		<Stack gap='md'>
			<div className={cls.container}>
				<SimpleGrid
					className={cls.grid}
					minColWidth='var(--list-min-col-width)'
					spacing={CONTENT_GRID_SPACING}
					autoFlow='auto-fit'
					component='ul'
				>
					{reminds.map((remind) => (
						<li key={remind.id}>
							<RemindCard
								remind={remind}
								onRemindChange={onRemindChange}
								actionSlot={actionSlot?.(remind)}
								hideSourceBadge={hideSourceBadge}
							/>
						</li>
					))}
				</SimpleGrid>
			</div>
		</Stack>
	);
}
