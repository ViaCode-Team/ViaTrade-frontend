import { LogoutCurrentSessionAction } from '@/features/auth/logout';
import { DataState } from '@/shared/ui/data-state';
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
		<DataState hasData={!!sessions.length} hasResults={!!paginatedSessions.length}>
			<SessionsList
				paginatedSessions={paginatedSessions}
				currentSessionId={currentSessionId}
				activePage={activePage}
				totalPages={totalPages}
				setPage={setPage}
				renderAction={(_, isCurrent) => {
					if (!isCurrent)
						return null;

					return <LogoutCurrentSessionAction />;
				}}
			/>
		</DataState>
	);
}

export const SessionsOverviewListBoundary = withQueryBoundary(SessionsOverviewList, {
	suspenseProps: {
		fallback: <SessionsListSkeleton />,
	},
});
