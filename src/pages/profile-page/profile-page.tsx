import type { ReactNode } from 'react';

import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ComputerIcon from '@mui/icons-material/Computer';
import EditIcon from '@mui/icons-material/Edit';
import EmailIcon from '@mui/icons-material/Email';
import KeyIcon from '@mui/icons-material/Key';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import SecurityIcon from '@mui/icons-material/Security';
import TelegramIcon from '@mui/icons-material/Telegram';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Pagination from '@mui/material/Pagination';
import Paper from '@mui/material/Paper';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { useLogout, useLogoutAll } from '@/entities/auth';
import { useGetMe } from '@/entities/user';

const SESSIONS_PER_PAGE = 5;

const MOBILE_DEVICE_RE = /iPhone|iPad|Android|Mobile/i;
const WINDOWS_RE = /Windows/;
const MAC_RE = /Macintosh|Mac OS/;
const IPAD_RE = /iPad/;
const IPHONE_RE = /iPhone/;
const ANDROID_RE = /Android/;
const LINUX_RE = /Linux/;
const FIREFOX_RE = /Firefox\//;
const OPERA_RE = /OPR\/|Opera/;
const EDGE_RE = /Edg\//;
const CHROME_RE = /Chrome\//;
const SAFARI_RE = /Safari\//;

type MockSession = {
	id: string;
	userAgent: string;
	createdAt: string;
	lastSeen: string;
	isCurrent: boolean;
};

const mockSessions: MockSession[] = [
	{
		id: '1',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
		createdAt: '2026-03-28T10:15:00',
		lastSeen: '2026-04-02T14:30:00',
		isCurrent: true,
	},
	{
		id: '2',
		userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
		createdAt: '2026-03-25T09:00:00',
		lastSeen: '2026-04-01T18:45:00',
		isCurrent: false,
	},
	{
		id: '3',
		userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
		createdAt: '2026-03-20T16:30:00',
		lastSeen: '2026-03-31T22:10:00',
		isCurrent: false,
	},
	{
		id: '4',
		userAgent: 'Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36',
		createdAt: '2026-03-15T08:20:00',
		lastSeen: '2026-03-29T11:05:00',
		isCurrent: false,
	},
	{
		id: '5',
		userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:134.0) Gecko/20100101 Firefox/134.0',
		createdAt: '2026-03-10T14:00:00',
		lastSeen: '2026-03-28T09:30:00',
		isCurrent: false,
	},
	{
		id: '6',
		userAgent: 'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Mobile/15E148 Safari/604.1',
		createdAt: '2026-03-05T12:45:00',
		lastSeen: '2026-03-25T17:20:00',
		isCurrent: false,
	},
	{
		id: '7',
		userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
		createdAt: '2026-02-28T20:15:00',
		lastSeen: '2026-03-20T13:40:00',
		isCurrent: false,
	},
];

function isMobileDevice(userAgent: string): boolean {
	return MOBILE_DEVICE_RE.test(userAgent);
}

function getDeviceName(userAgent: string): string {
	if (WINDOWS_RE.test(userAgent))
		return 'Windows';
	if (MAC_RE.test(userAgent))
		return 'macOS';
	if (IPAD_RE.test(userAgent))
		return 'iPad';
	if (IPHONE_RE.test(userAgent))
		return 'iPhone';
	if (ANDROID_RE.test(userAgent))
		return 'Android';
	if (LINUX_RE.test(userAgent))
		return 'Linux';
	return 'Неизвестное устройство';
}

function getBrowserName(userAgent: string): string {
	if (FIREFOX_RE.test(userAgent))
		return 'Firefox';
	if (OPERA_RE.test(userAgent))
		return 'Opera';
	if (EDGE_RE.test(userAgent))
		return 'Edge';
	if (CHROME_RE.test(userAgent))
		return 'Chrome';
	if (SAFARI_RE.test(userAgent))
		return 'Safari';
	return 'Браузер';
}

function formatDate(dateStr: string | Date): string {
	return new Date(dateStr).toLocaleDateString('ru-RU', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});
}

function formatDateTime(dateStr: string | Date): string {
	return new Date(dateStr).toLocaleString('ru-RU', {
		day: 'numeric',
		month: 'short',
		hour: '2-digit',
		minute: '2-digit',
	});
}

function InfoRow({
	icon,
	label,
	value,
	disabled,
}: {
	icon: ReactNode;
	label: string;
	value: ReactNode;
	disabled?: boolean;
}) {
	return (
		<Stack
			direction='row'
			alignItems='center'
			gap={1.5}
			sx={{
				opacity: disabled ? 0.45 : 1,
				px: 1.5,
				py: 1.25,
				borderRadius: 1.5,
				bgcolor: 'action.hover',
			}}
		>
			<Box
				sx={{
					display: 'flex',
					p: 0.75,
					borderRadius: 1,
					bgcolor: 'background.default',
				}}
			>
				{icon}
			</Box>
			<Stack sx={{ minWidth: 0, flex: 1 }}>
				<Typography variant='caption' color='text.secondary' lineHeight={1.2}>
					{label}
				</Typography>
				<Typography variant='body2' component='div' fontWeight={500}>
					{value}
				</Typography>
			</Stack>
		</Stack>
	);
}

function SessionItem({
	session,
	onLogout,
	isLoggingOut,
}: {
	session: MockSession;
	onLogout: () => void;
	isLoggingOut: boolean;
}) {
	const deviceName = getDeviceName(session.userAgent);
	const browserName = getBrowserName(session.userAgent);
	const isMobile = isMobileDevice(session.userAgent);

	return (
		<Stack
			direction={{ xs: 'column', sm: 'row' }}
			alignItems={{ xs: 'flex-start', sm: 'center' }}
			justifyContent='space-between'
			gap={1}
			sx={{
				py: 1.5,
				px: 1.5,
				borderRadius: 1.5,
				transition: 'background-color 0.15s',
				'&:hover': { bgcolor: 'action.hover' },
			}}
		>
			<Stack direction='row' alignItems='center' gap={1.5} sx={{ minWidth: 0 }}>
				<Avatar
					variant='rounded'
					sx={{
						width: 36,
						height: 36,
						bgcolor: session.isCurrent ? 'success.main' : 'action.selected',
						color: session.isCurrent ? 'success.contrastText' : 'text.secondary',
					}}
				>
					{isMobile ? <PhoneAndroidIcon fontSize='small' /> : <ComputerIcon fontSize='small' />}
				</Avatar>
				<Box sx={{ minWidth: 0 }}>
					<Stack direction='row' alignItems='center' gap={1} flexWrap='wrap'>
						<Typography variant='body2' fontWeight={600} noWrap>
							{deviceName}
							{' — '}
							{browserName}
						</Typography>
						{session.isCurrent && (
							<Chip
								label='Текущая'
								size='small'
								color='success'
								sx={{ height: 20, fontSize: '0.7rem' }}
							/>
						)}
					</Stack>
					<Stack direction='row' flexWrap='wrap' columnGap={1.5} rowGap={0}>
						<Typography variant='caption' color='text.secondary'>
							<Box component='span' fontWeight={600}>
								{'Вход: '}
							</Box>
							{formatDateTime(session.createdAt)}
						</Typography>
						<Typography variant='caption' color='text.secondary'>
							<Box component='span' fontWeight={600}>
								{'Активность: '}
							</Box>
							{formatDateTime(session.lastSeen)}
						</Typography>
					</Stack>
				</Box>
			</Stack>

			{!session.isCurrent && (
				<Tooltip title='Завершить сессию'>
					<IconButton
						size='small'
						color='error'
						onClick={onLogout}
						disabled={isLoggingOut}
						sx={{ flexShrink: 0 }}
					>
						<LogoutIcon fontSize='small' />
					</IconButton>
				</Tooltip>
			)}
		</Stack>
	);
}

export function ProfilePage() {
	const { data: meData, isLoading: isMeLoading } = useGetMe();
	const { mutate: logoutCurrent, isPending: isLoggingOut } = useLogout();
	const { mutate: logoutAll, isPending: isLoggingOutAll } = useLogoutAll();
	const [page, setPage] = useState(1);

	const user = meData?.data;

	const totalPages = Math.ceil(mockSessions.length / SESSIONS_PER_PAGE);
	const paginatedSessions = mockSessions.slice(
		(page - 1) * SESSIONS_PER_PAGE,
		page * SESSIONS_PER_PAGE,
	);

	return (
		<Box sx={{ p: 3 }}>
			<Typography variant='h4' fontWeight='bold' gutterBottom>
				Профиль
			</Typography>

			<Grid container spacing={3} alignItems='flex-start' sx={{ mt: 1 }}>
				{/* Личная информация */}
				<Grid size={{ xs: 12, md: 5 }}>
					<Paper sx={{ p: 0, overflow: 'hidden' }}>
						{/* Заголовок секции */}
						<Stack direction='row' alignItems='center' gap={1} sx={{ px: 3, pt: 2.5, pb: 1.5 }}>
							<PersonIcon fontSize='small' color='action' />
							<Typography variant='h6'>
								Личная информация
							</Typography>
						</Stack>
						<Divider />

						{/* Аватар + логин */}
						<Stack alignItems='center' sx={{ py: 3, px: 3, bgcolor: 'action.hover' }}>
							<Avatar
								sx={{
									width: 64,
									height: 64,
									mb: 1.5,
									bgcolor: 'secondary.main',
									color: 'secondary.contrastText',
									fontSize: '1.5rem',
									fontWeight: 700,
								}}
							>
								{user?.login?.charAt(0).toUpperCase() ?? '?'}
							</Avatar>
							<Typography variant='caption' color='text.secondary'>
								Логин
							</Typography>
							<Stack direction='row' alignItems='center' gap={0.5}>
								{isMeLoading
									? <Skeleton width={140} height={32} />
									: (
											<Typography variant='h5' fontWeight='bold'>
												{user?.login}
											</Typography>
										)}
								<Tooltip title='Изменить логин'>
									<IconButton size='small' sx={{ ml: 0.5 }}>
										<EditIcon fontSize='small' />
									</IconButton>
								</Tooltip>
							</Stack>
						</Stack>

						<Divider />

						{/* Информационные поля */}
						<Stack gap={1} sx={{ p: 2 }}>
							<InfoRow
								icon={<EmailIcon fontSize='small' color='action' />}
								label='Почта'
								value={
									<Chip label='Скоро' size='small' variant='outlined' sx={{ height: 20, fontSize: '0.7rem' }} />
								}
								disabled
							/>

							<InfoRow
								icon={<CalendarMonthIcon fontSize='small' color='action' />}
								label='Дата регистрации'
								value={
									<Chip label='Скоро' size='small' variant='outlined' sx={{ height: 20, fontSize: '0.7rem' }} />
								}
								disabled
							/>

							<InfoRow
								icon={<LoginIcon fontSize='small' color='action' />}
								label='Последний вход'
								value={
									isMeLoading
										? <Skeleton width={160} />
										: user?.lastLoginDate
											? formatDate(user.lastLoginDate)
											: '—'
								}
							/>

							<InfoRow
								icon={<TelegramIcon fontSize='small' color='action' />}
								label='Telegram'
								value={
									isMeLoading
										? <Skeleton width={120} />
										: user?.tgId
											? (
													<Chip
														label={user.tgId}
														size='small'
														color='info'
														variant='outlined'
														sx={{ height: 22 }}
													/>
												)
											: 'Не привязан'
								}
							/>
						</Stack>
					</Paper>
				</Grid>

				{/* Безопасность */}
				<Grid size={{ xs: 12, md: 7 }}>
					<Paper sx={{ p: 0, overflow: 'hidden' }}>
						{/* Заголовок + кнопка пароля */}
						<Stack
							direction={{ xs: 'column', sm: 'row' }}
							alignItems={{ xs: 'flex-start', sm: 'center' }}
							justifyContent='space-between'
							gap={1}
							sx={{ px: 3, pt: 2.5, pb: 1.5 }}
						>
							<Stack direction='row' alignItems='center' gap={1}>
								<SecurityIcon fontSize='small' color='action' />
								<Typography variant='h6'>
									Безопасность
								</Typography>
							</Stack>
							<Button
								variant='text'
								size='small'
								disabled
								startIcon={<KeyIcon />}
							>
								Сбросить пароль
							</Button>
						</Stack>
						<Divider />

						{/* Сессии */}
						<Box sx={{ p: 2 }}>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
								sx={{ mb: 1.5, px: 0.5 }}
							>
								<Typography variant='subtitle2' color='text.secondary'>
									Активные сессии (
									{mockSessions.length}
									)
								</Typography>
								<Button
									variant='outlined'
									size='small'
									color='error'
									startIcon={<LogoutIcon />}
									onClick={() => logoutAll()}
									disabled={isLoggingOutAll}
								>
									Выйти со всех
								</Button>
							</Stack>

							<Stack gap={0.5}>
								{paginatedSessions.map((session) => (
									<SessionItem
										key={session.id}
										session={session}
										onLogout={() => session.isCurrent ? logoutCurrent() : undefined}
										isLoggingOut={isLoggingOut}
									/>
								))}
							</Stack>

							{totalPages > 1 && (
								<Stack alignItems='center' sx={{ mt: 2 }}>
									<Pagination
										count={totalPages}
										page={page}
										onChange={(_e, value) => setPage(value)}
										size='small'
									/>
								</Stack>
							)}
						</Box>
					</Paper>
				</Grid>
			</Grid>
		</Box>
	);
}
