import { useMemo, useState } from 'react';

import { useGetSessionsSuspense } from '@/entities/auth';
import {
	getCurrentSessionId,
	getSessionsPage,
	getSessionsPagesCount,
	normalizeUserSessions,
	sortUserSessionsByActivity,
} from '@/entities/session';
import { defaultFilters } from '@/features/session/filter-sessions/model/filters';
import { useUserSessionLogout } from '@/features/session/manage-sessions';
import { useUrlFilters } from '@/shared/lib/hooks';

export function useSessionsOverview() {
	const { filters } = useUrlFilters(defaultFilters);
	const searchQuery = filters.sq;
	const [page, setPage] = useState(1);
	const [prevSearchQuery, setPrevSearchQuery] = useState(searchQuery);

	if (searchQuery !== prevSearchQuery) {
		setPrevSearchQuery(searchQuery);
		setPage(1);
	}

	const sessionLogout = useUserSessionLogout();

	const { data: sessionsData, refetch } = useGetSessionsSuspense({ query: { refetchInterval: 300000 } });

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
		if (sessionId === currentSessionId) {
			sessionLogout.requestLogoutCurrentSession();
		}
		// TODO: per-session revoke when API endpoint is available
	};

	return {
		sessions,
		filteredSessions,
		paginatedSessions,
		currentSessionId,
		activePage,
		totalPages,
		setPage,
		handleLogoutSession,
		refetch,
	};
}
