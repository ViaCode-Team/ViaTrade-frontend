import { LogoutCurrentSessionAction } from '@/features/auth/logout';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import {
	SessionsList,
	SessionsListSkeleton,
} from '../session-entity';
import { useSessionsOverview } from './use-sessions-overview';

function SessionsOverviewList() {
	const {
		filteredSessions,
		currentSessionId,
		page,
		totalPages,
		totalCount,
		setPage,
	} = useSessionsOverview();

	return (
		<DataState hasData={!!totalCount} hasResults={!!filteredSessions.length}>
			<SessionsList
				paginatedSessions={filteredSessions}
				currentSessionId={currentSessionId}
				pagination={{ page, totalPages, onPageChange: setPage }}
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
