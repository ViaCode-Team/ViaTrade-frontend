import { Stack } from '@mantine/core';

import { LogoutCurrentSessionAction } from '@/features/auth/logout';
import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { SESSIONS_PER_PAGE, SessionsList, SessionsListSkeleton } from '../session-entity';
import { SessionsOverviewStatusBar } from './sessions-overview-status-bar';
import { useSessionsOverview } from './use-sessions-overview';

function SessionsOverviewList() {
	const {
		filteredSessions,
		currentSessionId,
		page,
		totalPages,
		totalCount,
		setPage,
		hasSearchQuery,
		resetFilters,
	} = useSessionsOverview();

	return (
		<DataState
			hasData={!!totalCount}
			hasResults={!!filteredSessions.length}
			onResetFilters={resetFilters}
		>
			<Stack gap='md'>
				<SessionsOverviewStatusBar
					totalCount={totalCount}
					filteredCount={filteredSessions.length}
					page={page}
					pageSize={SESSIONS_PER_PAGE}
					showRange={!hasSearchQuery}
				/>

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
			</Stack>
		</DataState>
	);
}

export const SessionsOverviewListBoundary = withQueryBoundary(SessionsOverviewList, {
	suspenseProps: {
		fallback: <SessionsListSkeleton />,
	},
});
