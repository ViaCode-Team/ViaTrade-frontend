import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

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
		handleLogoutSession,
	} = useSessionsOverview();

	return (
		<SessionsList
			sessions={sessions}
			paginatedSessions={paginatedSessions}
			currentSessionId={currentSessionId}
			activePage={activePage}
			totalPages={totalPages}
			setPage={setPage}
			actionSlot={(session, isCurrent) => {
				if (!isCurrent)
					return null;
				return (
					<Tooltip label='Завершить текущую сессию'>
						<ActionIcon
							size='lg'
							variant='subtle'
							color='red'
							aria-label='Завершить текущую сессию'
							onClick={() => handleLogoutSession(session.id)}
						>
							<IconLogout size={20} />
						</ActionIcon>
					</Tooltip>
				);
			}}
		/>
	);
}

export const SessionsOverviewListBoundary = withQueryBoundary(SessionsOverviewList, {
	suspenseProps: {
		fallback: <SessionsListSkeleton />,
	},
});
