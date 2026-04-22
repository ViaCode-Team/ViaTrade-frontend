import { Stack } from '@mantine/core';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { useGetSessions, useLogout, useLogoutAll } from '@/entities/auth';
import { ROUTES } from '@/shared/model/routes';

import { getCurrentSessionId, normalizeUserSessions } from '../../model/user-sessions';
import { SessionsList } from './sessions-list';
import { SessionsListHeader } from './sessions-list-header';
import { SessionsListSkeleton } from './sessions-list.skeleton';

export function SessionsListSection() {
	const navigate = useNavigate();
	const { data: sessionsData, isLoading } = useGetSessions();

	const onLogoutSuccess = () => navigate(ROUTES.LOGIN);

	const { mutate: logoutAll, isPending: isLoggingOutAll } = useLogoutAll({
		mutation: { onSuccess: onLogoutSuccess },
	});
	const { mutate: logoutCurrent } = useLogout({
		mutation: { onSuccess: onLogoutSuccess },
	});

	const sessions = useMemo(() => normalizeUserSessions(sessionsData?.data), [sessionsData?.data]);
	const currentSessionId = useMemo(() => getCurrentSessionId(sessions), [sessions]);

	const handleLogoutSession = (sessionId: string) => {
		if (sessionId !== currentSessionId)
			return;

		logoutCurrent();
		// TODO: per-session revoke when API endpoint is available
	};


	return (
		<Stack>
			<SessionsListHeader
				totalSessions={sessions.length}
				onLogoutAll={logoutAll}
				isLoggingOutAll={isLoggingOutAll}
			/>

			{isLoading
				? <SessionsListSkeleton />
				: (
						<SessionsList
							sessions={sessions}
							currentSessionId={currentSessionId}
							onLogoutSession={handleLogoutSession}
						/>
					)}
		</Stack>
	);
}
