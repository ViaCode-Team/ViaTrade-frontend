import {
	ActionIcon,
	Anchor,
	Badge,
	Button,
	Divider,
	Group,
	Pagination,
	Stack,
	Text,
	Tooltip,
} from '@mantine/core';
import { IconDeviceDesktop, IconDeviceMobile, IconDeviceTablet, IconLogout } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Link as RouterLink } from 'react-router';

import type { UserSessionDto } from '@/shared/api';

import { parseUserAgent } from '../lib/parse-user-agent';
import classes from './sessions-list.module.css';

const SESSIONS_PER_PAGE = 5;

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
		return <IconDeviceMobile size={24} className={classes.deviceIcon} />;
	if (TABLET_RE.test(ua))
		return <IconDeviceTablet size={24} className={classes.deviceIcon} />;

	return <IconDeviceDesktop size={24} className={classes.deviceIcon} />;
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
			<div className={classes.header}>
				<Text size='lg' fw={600}>
					Активные сессии
					<Text component='span' size='sm' c='dimmed' ml='xs'>
						(
						{sessions.length}
						)
					</Text>
				</Text>

				<Group gap='sm'>
					<Anchor
						component={RouterLink}
						to='/reset-password'
						size='sm'
						c='#ffb752'
						fw={500}
					>
						Сбросить пароль
					</Anchor>

					<Button
						variant='outline'
						color='red'
						size='xs'
						leftSection={<IconLogout size={16} />}
						onClick={onLogoutAll}
						disabled={isLoggingOutAll}
					>
						Выйти из всех
					</Button>
				</Group>
			</div>

			<Stack gap={0}>
				{paginatedSessions.map((session, idx) => {
					const isCurrent = session.id === currentSessionId;

					return (
						<div key={session.id}>
							{idx > 0 && <Divider />}
							<div className={classes.sessionRow}>
								{getDeviceIcon(session.userAgent)}

								<div className={classes.sessionInfo}>
									<Group gap='xs'>
										<Text size='sm' fw={500} className={classes.userAgent}>
											{parseUserAgent(session.userAgent)}
										</Text>

										{isCurrent && (
											<Badge
												color='green'
												variant='filled'
												size='xs'
											>
												Текущая
											</Badge>
										)}
									</Group>

									<Group gap='md' mt={2} className={classes.sessionDates}>
										<Text size='xs' c='dimmed'>
											Создана:
											{' '}
											{dayjs(session.createdAt).format('DD.MM.YYYY, HH:mm')}
										</Text>
										<Text size='xs' c='dimmed'>
											Активность:
											{' '}
											{dayjs(session.lastSeen).format('DD.MM.YYYY, HH:mm')}
										</Text>
									</Group>
								</div>

								<Tooltip label={isCurrent ? 'Выйти' : 'Завершить сессию'}>
									<ActionIcon
										size='sm'
										variant='subtle'
										color='red'
										onClick={() => onLogoutSession(session.id)}
									>
										<IconLogout size={16} />
									</ActionIcon>
								</Tooltip>
							</div>
						</div>
					);
				})}
			</Stack>

			{totalPages > 1 && (
				<Group justify='center' mt='sm'>
					<Pagination
						total={totalPages}
						value={page}
						onChange={setPage}
						size='sm'
					/>
				</Group>
			)}
		</Stack>
	);
}
