import { SimpleGrid } from '@mantine/core';
import { useSearchParams } from 'react-router';

import { RemindCard, useRemindContext } from '@/entities/remind';
import { RemindCardActions } from '@/features/remind/manage-reminds';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';

import { RemindListSkeleton } from './remind-list.skeleton';

export function RemindList({ hideSourceBadge }: { hideSourceBadge?: boolean } = {}) {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('rq')?.toLowerCase() || '';
	const sortOption = searchParams.get('sort') || 'date-desc';

	const {
		reminds,
		isLoading,
		onRemindChange,
	} = useRemindContext();

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

	if (isLoading && !hasAnyReminds) {
		return <RemindListSkeleton />;
	}

	return (
		<>
			{hasFilteredReminds && (
				<SimpleGrid
					minColWidth={300}
					spacing={CONTENT_GRID_SPACING}
					component='ul'
				>
					{filteredReminds.map((remind) => (
						<li key={remind.id}>
							<RemindCard
								remind={remind}
								onRemindChange={onRemindChange}
								actionSlot={<RemindCardActions remindId={remind.id} />}
								hideSourceBadge={hideSourceBadge}
							/>
						</li>
					))}
				</SimpleGrid>
			)}

			{!hasFilteredReminds && hasAnyReminds && (
				<EmptyState title='По вашему запросу ничего не найдено' />
			)}

			{!hasAnyReminds && !isLoading && (
				<EmptyState title='Напоминаний пока нет.' description='Нажмите «Добавить», чтобы добавить первое.' />
			)}
		</>
	);
}
