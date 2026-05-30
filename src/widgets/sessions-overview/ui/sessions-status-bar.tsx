import { Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useSessionsOverview } from '../lib/use-sessions-overview';

export function SessionsStatusBar() {
	const {
		sessions,
		filteredSessions,
	} = useSessionsOverview();

	if (sessions.length === 0 || filteredSessions.length === 0) {
		return null;
	}

	return (
		<ListStatusBar
			totalCount={sessions.length}
			filteredCount={filteredSessions.length}
			refreshIntervalText='Автообновление: 1 мин'
		/>
	);
}

export const SessionsStatusBarBoundary = withQueryBoundary(SessionsStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} radius='md' />,
	},
});
