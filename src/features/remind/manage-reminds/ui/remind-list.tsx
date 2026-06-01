import { SimpleGrid, Stack } from '@mantine/core';

import { RemindCard } from '@/entities/remind';
import { RemindCardActions } from '@/features/remind/manage-reminds';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useRemindList } from '../lib/use-remind-list';
import cls from './remind-list.module.css';
import { RemindListSkeleton } from './remind-list.skeleton';

export function RemindList({
	hideSourceBadge,
	instrumentId,
	limit,
}: {
	hideSourceBadge?: boolean;
	instrumentId?: number;
	limit?: number;
}) {
	const { reminds, filteredReminds: allFilteredReminds, handleRemindChange } = useRemindList(instrumentId);

	const filteredReminds = limit ? allFilteredReminds.slice(0, limit) : allFilteredReminds;

	const hasAnyReminds = reminds.length > 0;
	const hasFilteredReminds = filteredReminds.length > 0;

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
					{filteredReminds.map((remind) => (
						<li key={remind.id}>
							<RemindCard
								remind={remind}
								onRemindChange={handleRemindChange}
								actionSlot={<RemindCardActions remindId={remind.id} />}
								hideSourceBadge={hideSourceBadge}
							/>
						</li>
					))}
				</SimpleGrid>
			</div>
		</Stack>
	);
}


export const RemindListBoundary = withQueryBoundary(RemindList, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
