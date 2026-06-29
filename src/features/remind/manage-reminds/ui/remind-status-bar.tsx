import { Skeleton } from '@mantine/core';

import { QUERY_REFETCH_INTERVAL_TEXT } from '@/shared/model';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useRemindList } from '../lib/use-remind-list';

export function RemindStatusBar({ instrumentId }: { instrumentId?: number }) {
	const { reminds, filteredReminds, refetch } = useRemindList(instrumentId);

	return (
		<ListStatusBar
			totalCount={reminds.length}
			filteredCount={filteredReminds.length}
			refreshIntervalText={QUERY_REFETCH_INTERVAL_TEXT}
			onRefresh={refetch}
		/>
	);
}

export const RemindStatusBarBoundary = withQueryBoundary(RemindStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
