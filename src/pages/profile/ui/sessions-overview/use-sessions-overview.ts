import { useMemo } from 'react';

import { useGetSessionsSuspense } from '@/entities/session';
import { useUrlFilters } from '@/shared/lib/url-filters';
import { v } from '@/shared/lib/validation';
import { QUERY_REFETCH_INTERVAL } from '@/shared/model';

import {
	normalizeUserSessions,
	SESSIONS_PER_PAGE,
	sortUserSessionsByPriority,
} from '../session-entity';

const sessionPaginationSchema = v.object({
	page: v.fallback(v.string(), '1'),
});

export function useSessionsOverview() {
	const { filters, setFilter } = useUrlFilters(sessionPaginationSchema);
	const page = Math.max(Number(filters.page) || 1, 1);
	const { data: sessionsData, refetch } = useGetSessionsSuspense(
		{ page, pageSize: SESSIONS_PER_PAGE },
		{ query: { refetchInterval: QUERY_REFETCH_INTERVAL } },
	);

	const sessions = useMemo(() => normalizeUserSessions(sessionsData.data.items), [sessionsData.data.items]);
	const sortedSessions = useMemo(
		() => sortUserSessionsByPriority(sessions),
		[sessions],
	);

	return {
		sessions: sortedSessions,
		page,
		totalPages: sessionsData.data.totalPages,
		totalCount: sessionsData.data.totalCount,
		setPage: (nextPage: number) => setFilter('page', String(nextPage)),
		refetch,
	};
}
