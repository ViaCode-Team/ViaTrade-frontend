import { Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useSessionsOverview } from './use-sessions-overview';

export function SessionsStatusBar() {
	const {
		filteredSessions,
		totalCount,
	} = useSessionsOverview();

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredSessions.length}
		/>
	);
}

export const SessionsStatusBarBoundary = withQueryBoundary(SessionsStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
