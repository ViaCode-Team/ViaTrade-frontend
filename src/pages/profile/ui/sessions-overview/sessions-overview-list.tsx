import { Stack } from '@mantine/core';

import { DataState } from '@/shared/ui/data-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { SESSIONS_PER_PAGE, SessionsList, SessionsListSkeleton } from '../session-entity';
import { SessionsOverviewStatusBar } from './sessions-overview-status-bar';
import { useSessionsOverview } from './use-sessions-overview';

function SessionsOverviewList() {
	const {
		filteredSessions,
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
					pagination={{
						page,
						pageSize: SESSIONS_PER_PAGE,
						totalPages,
						onPageChange: setPage,
						showRange: !hasSearchQuery,
					}}
				/>

				<SessionsList
					paginatedSessions={filteredSessions}
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
