import { Loader, Stack } from '@mantine/core';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { useGetSessions, useLogout, useLogoutAll } from '@/entities/auth';
import { useGetMe } from '@/entities/user';
import { ROUTES } from '@/shared/model/routes';

import classes from './profile-page.module.css';
import { ProfileInfo } from './ui/profile-info';
import { SessionsList } from './ui/sessions-list';

export function ProfilePage() {
	const navigate = useNavigate();
	const { data: meData, isLoading: isMeLoading } = useGetMe();
	const { data: sessionsData, isLoading: isSessionsLoading } = useGetSessions();

	const onLogoutSuccess = () => navigate(ROUTES.LOGIN);

	const { mutate: logoutAll, isPending: isLoggingOutAll } = useLogoutAll({
		mutation: { onSuccess: onLogoutSuccess },
	});
	const { mutate: logoutCurrent } = useLogout({
		mutation: { onSuccess: onLogoutSuccess },
	});

	const user = meData?.data;

	const sessions = useMemo(() => {
		const data = sessionsData?.data;
		if (!data)
			return [];
		return Array.isArray(data) ? data : [data];
	}, [sessionsData?.data]);

	const currentSessionId = useMemo(() => {
		if (sessions.length === 0)
			return undefined;
		return sessions.reduce((latest, session) =>
			new Date(session.lastSeen).getTime() > new Date(latest.lastSeen).getTime()
				? session
				: latest,
		).id;
	}, [sessions]);

	const handleLogoutSession = (sessionId: string) => {
		if (sessionId === currentSessionId)
			logoutCurrent();
		// TODO: per-session revoke when API endpoint is available
	};

	if (isMeLoading || isSessionsLoading) {
		return (
			<div className={classes.loader}>
				<Loader />
			</div>
		);
	}

	if (!user)
		return null;

	return (
		<Stack gap='xl' className={classes.root}>
			<ProfileInfo user={user} />

			<SessionsList
				sessions={sessions}
				currentSessionId={currentSessionId}
				onLogoutAll={() => logoutAll()}
				onLogoutSession={handleLogoutSession}
				isLoggingOutAll={isLoggingOutAll}
			/>
		</Stack>
	);
}
