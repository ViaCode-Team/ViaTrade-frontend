import { SimpleGrid, Stack } from '@mantine/core';

import { RemindCard } from '@/entities/remind';
import { RemindCardActions } from '@/features/remind/manage-reminds';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';

import { useRemindList } from '../lib/use-remind-list';
import cls from './remind-list.module.css';

export function RemindList({
	hideSourceBadge,
	instrumentId,
}: {
	hideSourceBadge?: boolean;
	instrumentId?: number;
} = {}) {
	const { reminds, filteredReminds, handleRemindChange } = useRemindList(instrumentId);

	const hasAnyReminds = reminds.length > 0;
	const hasFilteredReminds = filteredReminds.length > 0;

	return (
		<Stack gap='md'>
			{hasFilteredReminds && (
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
			)}

			{!hasFilteredReminds && hasAnyReminds && (
				<EmptyState title='По вашему запросу ничего не найдено' />
			)}

			{!hasAnyReminds && (
				<EmptyState title='Напоминаний пока нет.' description='Нажмите «Добавить», чтобы добавить первое.' />
			)}
		</Stack>
	);
}

import type { ComponentProps } from 'react';

import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { RemindListSkeleton } from './remind-list.skeleton';

export const RemindListBoundary = withQueryBoundary<NonNullable<ComponentProps<typeof RemindList>>>(RemindList, {
	suspenseProps: {
		fallback: <RemindListSkeleton />,
	},
});
