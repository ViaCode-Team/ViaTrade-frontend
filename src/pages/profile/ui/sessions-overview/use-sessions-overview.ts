import { useMemo } from 'react';

import { useGetSessionsSuspense } from '@/entities/session';
import { sessionFiltersSchema } from '@/pages/profile/ui/filter-sessions';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

import {
	getCurrentSessionId,
	normalizeUserSessions,
	SESSIONS_PER_PAGE,
	sortUserSessionsByActivity,
} from '../session-entity';

export function useSessionsOverview() {
	const { filters, setFilter, resetFilters } = useUrlFilters(sessionFiltersSchema);
	const searchQuery = filters.q;
	const page = Math.max(Number(filters.page) || 1, 1);
	const { data: sessionsData, refetch } = useGetSessionsSuspense(
		{ page, pageSize: SESSIONS_PER_PAGE },
		{ query: { refetchInterval: QUERY_REFETCH_INTERVAL } },
	);

	const sessions = useMemo(() => normalizeUserSessions(sessionsData.data.items), [sessionsData.data.items]);
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

	return {
		sessions,
		filteredSessions,
		currentSessionId,
		page,
		totalPages: sessionsData.data.totalPages,
		totalCount: sessionsData.data.totalCount,
		setPage: (nextPage: number) => setFilter('page', String(nextPage)),
		hasSearchQuery: Boolean(searchQuery.trim()),
		resetFilters,
		refetch,
	};
}
