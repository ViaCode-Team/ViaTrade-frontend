import { LogoutCurrentSessionAction } from '@/features/auth/logout';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { SessionsList, SessionsListSkeleton } from '../session-entity';
import { useSessionsOverview } from './use-sessions-overview';

function SessionsOverviewList() {
	const {
		sessions,
		paginatedSessions,
		currentSessionId,
		activePage,
		totalPages,
		setPage,
	} = useSessionsOverview();

	return (
		<SessionsList
			sessions={sessions}
			paginatedSessions={paginatedSessions}
			currentSessionId={currentSessionId}
			activePage={activePage}
			totalPages={totalPages}
			setPage={setPage}
			actionSlot={(_, isCurrent) => {
				if (!isCurrent)
					return null;
				return <LogoutCurrentSessionAction />;
			}}
		/>
	);
}

export const SessionsOverviewListBoundary = withQueryBoundary(SessionsOverviewList, {
	suspenseProps: {
		fallback: <SessionsListSkeleton />,
	},
});
