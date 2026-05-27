import {
	ActionIcon,
	Group,
	Pagination,
	Stack,
	Tooltip,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';

import { useGetSessionsSuspense } from '@/entities/auth';
import { SessionListItem } from '@/entities/session';
import {
	getCurrentSessionId,
	getSessionsPage,
	getSessionsPagesCount,
	normalizeUserSessions,
	sortUserSessionsByActivity,
	useUserSessionLogout,
} from '@/features/session/manage-sessions';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { SessionsListSkeleton } from './sessions-list.skeleton';

export function SessionsList() {
	const [searchParams] = useSearchParams();
	const searchQuery = searchParams.get('sq') || '';
	const [page, setPage] = useState(1);
	const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

	if (searchQuery !== prevSearchQuery) {
		setPrevSearchQuery(searchQuery);
		setPage(1);
	}

	const sessionLogout = useUserSessionLogout();

	const { data: sessionsData } = useGetSessionsSuspense();

	const sessions = useMemo(() => normalizeUserSessions(sessionsData.data), [sessionsData.data]);
	const currentSessionId = useMemo(() => getCurrentSessionId(sessions), [sessions]);
	const sortedSessions = useMemo(
		() => sortUserSessionsByActivity(sessions, currentSessionId),
		[sessions, currentSessionId],
	);

	const filteredSessions = useMemo(() => {
		if (!searchQuery.trim())
			return sortedSessions;
		const query = searchQuery.toLowerCase().trim();
		return sortedSessions.filter((session) =>
			session.userAgent.toLowerCase().includes(query),
		);
	}, [sortedSessions, searchQuery]);

	const totalPages = getSessionsPagesCount(filteredSessions.length);
	const activePage = totalPages > 0 ? Math.min(page, totalPages) : 1;
	const paginatedSessions = useMemo(
		() => getSessionsPage(filteredSessions, activePage),
		[filteredSessions, activePage],
	);

	const handleLogoutSession = (sessionId: string) => {
		if (sessionId === currentSessionId)
			sessionLogout.requestLogoutCurrentSession();
		// TODO: per-session revoke when API endpoint is available
	};

	return (
		<Stack gap='md'>
			{sessions.length === 0
				? (
						<EmptyState title='Активные сессии не найдены' />
					)
				: paginatedSessions.length === 0
					? (
							<EmptyState title='По вашему запросу ничего не найдено' />
						)
					: (
							<>
								<Stack component='ul' m={0} p={0} gap='xs'>
									{paginatedSessions.map((session) => {
										const isCurrent = session.id === currentSessionId;
										const logoutLabel = isCurrent ? 'Завершить текущую сессию' : 'Завершить сессию';

										return (
											<SessionListItem
												key={session.id}
												session={session}
												isCurrent={isCurrent}
												actionSlot={(
													<Tooltip label={logoutLabel}>
														<ActionIcon
															size='lg'
															variant='subtle'
															color='red'
															aria-label={logoutLabel}
															onClick={() => handleLogoutSession(session.id)}
														>
															<IconLogout size={20} />
														</ActionIcon>
													</Tooltip>
												)}
											/>
										);
									})}
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
							</>
						)}
		</Stack>
	);
}

export const SessionsListBoundary = withQueryBoundary(SessionsList, {
	suspenseProps: {
		fallback: <SessionsListSkeleton />,
	},
});
