import { Stack } from '@mantine/core';

import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { SESSIONS_PER_PAGE, SessionsList, SessionsListSkeleton } from '../session-entity';
import { SessionsOverviewStatusBar } from './sessions-overview-status-bar';
import { useSessionsOverview } from './use-sessions-overview';

function SessionsOverviewList() {
	const {
		sessions,
		page,
		totalPages,
		totalCount,
		setPage,
	} = useSessionsOverview();

	return (
		<DataState
			hasData={!!totalCount}
			hasResults={!!sessions.length}
		>
			<Stack gap='md'>
				<SessionsOverviewStatusBar
					totalCount={totalCount}
					filteredCount={sessions.length}
					pagination={{
						page,
						pageSize: SESSIONS_PER_PAGE,
						totalPages,
						onPageChange: setPage,
					}}
				/>

				<SessionsList
					paginatedSessions={sessions}
					pagination={{ page, totalPages, onPageChange: setPage }}
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
