import type { ComponentProps } from 'react';

import { Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useRemindList } from '../lib/use-remind-list';

export function RemindStatusBar({ instrumentId }: { instrumentId?: number }) {
	const { reminds, filteredReminds, refetch } = useRemindList(instrumentId);

	const hasAnyReminds = reminds.length > 0;

	if (!hasAnyReminds) {
		return null;
	}

	return (
		<ListStatusBar
			totalCount={reminds.length}
			filteredCount={filteredReminds.length}
			refreshIntervalText='Автообновление: 5 мин'
			onRefresh={refetch}
		/>
	);
}

export const RemindStatusBarBoundary = withQueryBoundary<NonNullable<ComponentProps<typeof RemindStatusBar>>>(RemindStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} radius='md' />,
	},
});
