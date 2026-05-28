import { Badge, SimpleGrid, Stack } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useSearchParams } from 'react-router';

import { mapTradeRemindToRemindItem, RemindCard } from '@/entities/remind';
import { getGetAllByUserSuspenseQueryOptions, getGetTradeRemindByUserInstrumentSuspenseQueryOptions, useUpdateRemind } from '@/entities/remind/api/gen';
import { RemindCardActions } from '@/features/remind/manage-reminds';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { ListStatusBar } from '@/shared/ui/list-status-bar';

import cls from './remind-list.module.css';

export function RemindList({
	hideSourceBadge,
	instrumentId,
}: {
	hideSourceBadge?: boolean;
	instrumentId?: number;
} = {}) {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('rq')?.toLowerCase() || '';
	const sortOption = searchParams.get('sort') || 'date-desc';

	const queryOpts = instrumentId
		? getGetTradeRemindByUserInstrumentSuspenseQueryOptions(instrumentId)
		: getGetAllByUserSuspenseQueryOptions();

	const { data: response } = useSuspenseQuery(queryOpts);
	const reminds = response.data.map(mapTradeRemindToRemindItem);

	const updateRemindMutation = useUpdateRemind();

	const handleRemindChange = (remindId: string, updates: { text: string; date: string; time: string }) => {
		const remind = reminds.find((r) => r.id === remindId);
		if (!remind) {
			return;
		}

		updateRemindMutation.mutate({
			redindId: Number(remindId),
			data: {
				textRemind: updates.text,
				dateTime: `${updates.date}T${updates.time}:00.000Z`,
			},
		});
	};

	const hasAnyReminds = reminds.length > 0;

	const filteredReminds = reminds.filter((remind) =>
		remind.text.toLowerCase().includes(searchQuery),
	);

	filteredReminds.sort((a, b) => {
		const dateA = new Date(`${a.date}T${a.time}`).getTime();
		const dateB = new Date(`${b.date}T${b.time}`).getTime();

		if (sortOption === 'date-asc') {
			return dateA - dateB;
		}
		return dateB - dateA;
	});

	const hasFilteredReminds = filteredReminds.length > 0;

	const [now] = useState(Date.now);
	const activeCount = filteredReminds.filter((r) => new Date(`${r.date}T${r.time}`).getTime() >= now).length;
	const pastCount = filteredReminds.filter((r) => new Date(`${r.date}T${r.time}`).getTime() < now).length;

	return (
		<Stack gap='md'>
			{hasAnyReminds && (
				<ListStatusBar
					totalCount={reminds.length}
					filteredCount={filteredReminds.length}
					badges={(
						<>
							<Badge variant='dot' color='blue' size='sm'>
								Актуальные:
								{activeCount}
							</Badge>
							<Badge variant='dot' color='gray' size='sm'>
								Прошедшие:
								{pastCount}
							</Badge>
						</>
					)}
				/>
			)}

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
