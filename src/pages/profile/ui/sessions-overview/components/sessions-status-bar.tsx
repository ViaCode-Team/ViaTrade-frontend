import { Skeleton } from '@mantine/core';

import { QUERY_REFETCH_INTERVAL_TEXT } from '@/shared/model';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useSessionsOverview } from '../utils/use-sessions-overview';

export function SessionsStatusBar() {
	const {
		sessions,
		filteredSessions,
		refetch,
	} = useSessionsOverview();

	return (
		<ListStatusBar
			totalCount={sessions.length}
			filteredCount={filteredSessions.length}
			refreshIntervalText={QUERY_REFETCH_INTERVAL_TEXT}
			onRefresh={refetch}
		/>
	);
}

export const SessionsStatusBarBoundary = withQueryBoundary(SessionsStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
