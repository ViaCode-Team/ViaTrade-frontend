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

export function sortUserSessionsByActivity(sessions: UserSessionResponse[]): UserSessionResponse[] {
	return [...sessions].sort((a, b) => {
		return toTimestamp(b.lastSeen) - toTimestamp(a.lastSeen);
	});
}
