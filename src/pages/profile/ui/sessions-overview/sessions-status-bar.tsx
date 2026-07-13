import { Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useSessionsOverview } from './use-sessions-overview';

export function SessionsStatusBar() {
	const {
		sessions,
		filteredSessions,
	} = useSessionsOverview();

	return (
		<ListStatusBar
			totalCount={sessions.length}
			filteredCount={filteredSessions.length}
		/>
	);
}

export const SessionsStatusBarBoundary = withQueryBoundary(SessionsStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
