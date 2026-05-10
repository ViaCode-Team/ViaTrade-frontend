import { Group, Pagination, Stack } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';

import { getGetSessionsQueryKey, getSessions } from '@/entities/auth';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useUserSessionLogout } from '../../model/use-user-session-logout';
import {
	getCurrentSessionId,
	getSessionsPage,
	getSessionsPagesCount,
	normalizeUserSessions,
	sortUserSessionsByActivity,
} from '../../model/user-sessions';
import { SessionListItem } from './session-list-item';
import { SessionsListSkeleton } from './sessions-list.skeleton';

export function SessionsList() {
	const [page, setPage] = useState(1);
	const sessionLogout = useUserSessionLogout();
	const { data: sessionsData } = useSuspenseQuery({
		queryKey: getGetSessionsQueryKey(),
		queryFn: ({ signal }) => getSessions({ signal }),
	});

	const sessions = useMemo(() => normalizeUserSessions(sessionsData.data), [sessionsData.data]);
	const currentSessionId = useMemo(() => getCurrentSessionId(sessions), [sessions]);
	const sortedSessions = useMemo(
		() => sortUserSessionsByActivity(sessions, currentSessionId),
		[sessions, currentSessionId],
	);
	const totalPages = getSessionsPagesCount(sortedSessions.length);
	const activePage = totalPages > 0 ? Math.min(page, totalPages) : 1;
	const paginatedSessions = useMemo(
		() => getSessionsPage(sortedSessions, activePage),
		[sortedSessions, activePage],
	);

	const handleLogoutSession = (sessionId: string) => {
		if (sessionId === currentSessionId)
			sessionLogout.requestLogoutCurrentSession();
		// TODO: per-session revoke when API endpoint is available
	};

	return (
		<Stack gap='md'>
			<Stack component='ul' m={0} p={0} gap='xs'>
				{paginatedSessions.map((session) => (
					<SessionListItem
						key={session.id}
						session={session}
						isCurrent={session.id === currentSessionId}
						onLogoutSession={handleLogoutSession}
					/>
				))}
			</Stack>

			{totalPages > 1 && (
				<Group justify='center' mt='sm'>
					<Pagination
						total={totalPages}
						value={activePage}
						onChange={setPage}
						size='sm'
					/>
				</Group>
			)}
		</Stack>
	);
}

export const SessionsListBoundary = withQueryBoundary(SessionsList, {
	suspenseProps: {
		fallback: <SessionsListSkeleton />,
	},
});
