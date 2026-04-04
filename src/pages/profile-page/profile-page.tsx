import type { SxProps, Theme } from '@mui/material/styles';

import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useMemo } from 'react';
import { useNavigate } from 'react-router';

import { useGetSessions, useLogout, useLogoutAll } from '@/entities/auth';
import { useGetMe } from '@/entities/user';
import { ROUTES } from '@/shared/model/routes';

import { ProfileInfo } from './ui/profile-info';
import { SessionsList } from './ui/sessions-list';

const styles: Record<string, SxProps<Theme>> = {
	root: {
		p: { xs: 2, sm: 3 },
		maxWidth: 860,
		mx: 'auto',
	},
	section: {
		p: { xs: 2, sm: 3 },
	},
	infoSection: {
		bgcolor: 'transparent',
		boxShadow: 'none',
	},
	loader: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: 300,
	},
};

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
			<Box sx={styles.loader}>
				<CircularProgress />
			</Box>
		);
	}

	if (!user)
		return null;

	return (
		<Box sx={styles.root}>
			<Typography variant='h4' component='h1' fontWeight='bold' gutterBottom>
				Профиль
			</Typography>

			<Stack spacing={3}>
				<Paper sx={styles.infoSection} elevation={0}>
					<ProfileInfo user={user} />
				</Paper>

				<Paper sx={styles.section}>
					<SessionsList
						sessions={sessions}
						currentSessionId={currentSessionId}
						onLogoutAll={() => logoutAll()}
						onLogoutSession={handleLogoutSession}
						isLoggingOutAll={isLoggingOutAll}
					/>
				</Paper>
			</Stack>
		</Box>
	);
}
