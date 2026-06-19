import { useMemo, useState } from 'react';

import { useGetSessionsSuspense } from '@/entities/auth';
import { sessionFiltersSchema } from '@/pages/profile/ui/filter-sessions';
import { useUserSessionLogout } from '@/pages/profile/ui/manage-sessions';
import { useUrlFilters } from '@/shared/lib/hooks';

import {
	getCurrentSessionId,
	getSessionsPage,
	getSessionsPagesCount,
	normalizeUserSessions,
	sortUserSessionsByActivity,
} from '../../session-entity';

export function useSessionsOverview() {
	const { filters } = useUrlFilters(sessionFiltersSchema);
	const searchQuery = filters.q;
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
