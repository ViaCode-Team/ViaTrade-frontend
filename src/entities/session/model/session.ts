import type { UserSessionDto } from '@/shared/api';

type SessionsResponseData = UserSessionDto | UserSessionDto[] | null | undefined;

export const SESSIONS_PER_PAGE = 5;

function toTimestamp(value: string | Date) {
	return new Date(value).getTime();
}

export function normalizeUserSessions(data: SessionsResponseData): UserSessionDto[] {
	if (!data)
		return [];

	return Array.isArray(data) ? data : [data];
}

export function getCurrentSessionId(sessions: UserSessionDto[]): string | undefined {
	if (sessions.length === 0)
		return undefined;

	return sessions.reduce((latest, session) =>
		toTimestamp(session.lastSeen) > toTimestamp(latest.lastSeen)
			? session
			: latest,
	).id;
}

export function sortUserSessionsByActivity(
	sessions: UserSessionDto[],
	currentSessionId?: string,
): UserSessionDto[] {
	return [...sessions].sort((a, b) => {
		if (a.id === currentSessionId)
			return -1;
		if (b.id === currentSessionId)
			return 1;

		return toTimestamp(b.lastSeen) - toTimestamp(a.lastSeen);
	});
}

export function getSessionsPagesCount(totalSessions: number): number {
	return Math.ceil(totalSessions / SESSIONS_PER_PAGE);
}

export function getSessionsPage(sessions: UserSessionDto[], page: number): UserSessionDto[] {
	const start = (page - 1) * SESSIONS_PER_PAGE;
	return sessions.slice(start, start + SESSIONS_PER_PAGE);
}
