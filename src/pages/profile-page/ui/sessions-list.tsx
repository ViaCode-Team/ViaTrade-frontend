import type { SxProps, Theme } from '@mui/material/styles';

import ComputerIcon from '@mui/icons-material/Computer';
import LogoutIcon from '@mui/icons-material/Logout';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import TabletIcon from '@mui/icons-material/Tablet';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router';

import type { UserSessionDto } from '@/shared/api';

import { parseUserAgent } from '../lib/parse-user-agent';

const SESSIONS_PER_PAGE = 5;

const styles: Record<string, SxProps<Theme>> = {
	header: {
		display: 'flex',
		flexDirection: { xs: 'column', sm: 'row' },
		justifyContent: 'space-between',
		alignItems: { xs: 'flex-start', sm: 'center' },
		gap: 1.5,
		mb: 2,
	},
	headerActions: {
		display: 'flex',
		alignItems: 'center',
		gap: 1.5,
		flexWrap: 'wrap',
	},
	sessionRow: {
		display: 'flex',
		alignItems: 'center',
		gap: { xs: 1, sm: 2 },
		py: 1.5,
		px: { xs: 0.5, sm: 1 },
		borderRadius: 1,
		transition: 'background-color 0.15s',
		'&:hover': {
			bgcolor: 'action.hover',
		},
	},
	currentSession: {
		bgcolor: 'success.main',
		color: 'success.contrastText',
		'&:hover': {
			bgcolor: 'success.dark',
		},
	},
	deviceIcon: {
		color: 'text.secondary',
		fontSize: { xs: 22, sm: 28 },
		flexShrink: 0,
	},
	sessionInfo: {
		flex: 1,
		minWidth: 0,
	},
	userAgent: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		whiteSpace: 'nowrap',
	},
	pagination: {
		display: 'flex',
		justifyContent: 'center',
		mt: 2,
	},
	currentChip: {
		bgcolor: 'success.main',
		color: 'success.contrastText',
		fontWeight: 600,
		fontSize: '0.7rem',
	},
};

type SessionsListProps = {
	sessions: UserSessionDto[];
	currentSessionId?: string;
	onLogoutAll: () => void;
	onLogoutSession: (sessionId: string) => void;
	isLoggingOutAll?: boolean;
};

const MOBILE_RE = /mobile|android|iphone/;
const TABLET_RE = /tablet|ipad/;

function getDeviceIcon(userAgent: string) {
	const ua = userAgent.toLowerCase();

	if (MOBILE_RE.test(ua))
		return <PhoneAndroidIcon sx={styles.deviceIcon} />;
	if (TABLET_RE.test(ua))
		return <TabletIcon sx={styles.deviceIcon} />;

	return <ComputerIcon sx={styles.deviceIcon} />;
}

export function SessionsList({
	sessions,
	currentSessionId,
	onLogoutAll,
	onLogoutSession,
	isLoggingOutAll,
}: SessionsListProps) {
	const [page, setPage] = useState(1);

	const totalPages = Math.ceil(sessions.length / SESSIONS_PER_PAGE);

	const sortedSessions = useMemo(() => {
		return [...sessions].sort((a, b) => {
			if (a.id === currentSessionId)
				return -1;
			if (b.id === currentSessionId)
				return 1;
			return new Date(b.lastSeen).getTime() - new Date(a.lastSeen).getTime();
		});
	}, [sessions, currentSessionId]);

	const paginatedSessions = sortedSessions.slice(
		(page - 1) * SESSIONS_PER_PAGE,
		page * SESSIONS_PER_PAGE,
	);

	return (
		<Stack>
			<Box sx={styles.header}>
				<Typography variant='h6' fontWeight={600}>
					Активные сессии
					<Typography component='span' variant='body2' color='text.secondary' sx={{ ml: 1 }}>
						(
						{sessions.length}
						)
					</Typography>
				</Typography>

				<Box sx={styles.headerActions}>
					<Link
						component={RouterLink}
						to='/reset-password'
						variant='body2'
						color='secondary.main'
						underline='hover'
						fontWeight={500}
					>
						Сбросить пароль
					</Link>

					<Button
						variant='outlined'
						color='error'
						size='small'
						startIcon={<LogoutIcon />}
						onClick={onLogoutAll}
						disabled={isLoggingOutAll}
					>
						Выйти из всех
					</Button>
				</Box>
			</Box>

			<Stack divider={<Divider />}>
				{paginatedSessions.map((session) => {
					const isCurrent = session.id === currentSessionId;

					return (
						<Box key={session.id} sx={styles.sessionRow}>
							{getDeviceIcon(session.userAgent)}

							<Box sx={styles.sessionInfo}>
								<Stack direction='row' alignItems='center' spacing={1}>
									<Typography variant='body2' fontWeight={500} sx={styles.userAgent}>
										{parseUserAgent(session.userAgent)}
									</Typography>

									{isCurrent && (
										<Chip
											label='Текущая'
											size='small'
											sx={styles.currentChip}
										/>
									)}
								</Stack>

								<Stack
									direction={{ xs: 'column', sm: 'row' }}
									spacing={{ xs: 0, sm: 2 }}
									mt={0.25}
								>
									<Typography variant='caption' color='text.secondary'>
										Создана:
										{' '}
										{dayjs(session.createdAt).format('DD.MM.YYYY, HH:mm')}
									</Typography>
									<Typography variant='caption' color='text.secondary'>
										Активность:
										{' '}
										{dayjs(session.lastSeen).format('DD.MM.YYYY, HH:mm')}
									</Typography>
								</Stack>
							</Box>

							<Tooltip title={isCurrent ? 'Выйти' : 'Завершить сессию'}>
								<IconButton
									size='small'
									color='error'
									onClick={() => onLogoutSession(session.id)}
								>
									<LogoutIcon fontSize='small' />
								</IconButton>
							</Tooltip>
						</Box>
					);
				})}
			</Stack>

			{totalPages > 1 && (
				<Box sx={styles.pagination}>
					<Pagination
						count={totalPages}
						page={page}
						onChange={(_, value) => setPage(value)}
						color='standard'
						size='small'
					/>
				</Box>
			)}
		</Stack>
	);
}
