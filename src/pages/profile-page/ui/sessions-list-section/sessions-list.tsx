import { Group, Pagination, Stack } from '@mantine/core';
import { useMemo, useState } from 'react';

import type { UserSessionDto } from '@/shared/api';

import {
	getSessionsPage,
	getSessionsPagesCount,
	sortUserSessionsByActivity,
} from '../../model/user-sessions';
import { SessionListItem } from './session-list-item';

type SessionsListProps = {
	sessions: UserSessionDto[];
	currentSessionId?: string;
	onLogoutSession: (sessionId: string) => void;
};

export function SessionsList({
	sessions,
	currentSessionId,
	onLogoutSession,
}: SessionsListProps) {
	const [page, setPage] = useState(1);

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

	return (
		<Stack gap='md'>
			<Stack component='ul' m={0} p={0} gap='xs'>
				{paginatedSessions.map((session) => (
					<SessionListItem
						key={session.id}
						session={session}
						isCurrent={session.id === currentSessionId}
						onLogoutSession={onLogoutSession}
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
