import type { UserSessionResponse } from '@/shared/api';

type SessionsResponseData = UserSessionResponse | UserSessionResponse[] | null | undefined;

export const SESSIONS_PER_PAGE = 5;

function toTimestamp(value: string | Date) {
	return new Date(value).getTime();
}

export function normalizeUserSessions(data: SessionsResponseData): UserSessionResponse[] {
	if (!data)
		return [];

	return Array.isArray(data) ? data : [data];
}

export function sortUserSessionsByPriority(sessions: UserSessionResponse[]): UserSessionResponse[] {
	return [...sessions].sort((a, b) => {
		if (a.isCurrent !== b.isCurrent)
			return a.isCurrent ? -1 : 1;

		return toTimestamp(b.lastSeen) - toTimestamp(a.lastSeen);
	});
}
