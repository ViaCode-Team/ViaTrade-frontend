import {
	Anchor,
	Button,
	Group,
	Skeleton,
	Text,
	Title,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useMemo } from 'react';
import { Link as RouterLink } from 'react-router';

import { useGetSessions } from '@/entities/auth';

import { useUserSessionLogout } from '../../model/use-user-session-logout';
import { normalizeUserSessions } from '../../model/user-sessions';
import cls from './sessions-list.module.css';

type SessionsCountProps = {
	isLoading: boolean;
	total: number;
};

function SessionsCount({ isLoading, total }: SessionsCountProps) {
	if (isLoading)
		return <Skeleton component='span' h={16} w={22} display='inline-block' />;

	return (
		<>
			(
			{total}
			)
		</>
	);
}

export function SessionsListHeader() {
	const { data: sessionsData, isLoading } = useGetSessions();
	const sessions = useMemo(() => normalizeUserSessions(sessionsData?.data), [sessionsData?.data]);
	const sessionLogout = useUserSessionLogout();

	return (
		<div className={cls.header}>
			<Title order={4} className={cls.title}>
				Активные сессии
				{' '}
				<Text span size='sm' c='dimmed'>
					<SessionsCount isLoading={isLoading} total={sessions.length} />
				</Text>
			</Title>

			<Group gap='sm' className={cls.actions}>
				<Anchor
					component={RouterLink}
					to='/reset-password'
					size='sm'
					fw={500}
					className={cls.actionLink}
				>
					Сбросить пароль
				</Anchor>

				<Button
					className={cls.logoutButton}
					variant='outline'
					color='red'
					size='xs'
					leftSection={<IconLogout size={16} />}
					onClick={sessionLogout.requestLogoutAll}
					disabled={isLoading || sessionLogout.isLoggingOutAll}
				>
					Выйти из всех
				</Button>
			</Group>
		</div>
	);
}
