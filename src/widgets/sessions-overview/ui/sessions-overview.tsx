import {
	Button,
	Group,
	Skeleton,
	Stack,
	Text,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useMemo } from 'react';

import { useGetSessions } from '@/entities/auth';
import { normalizeUserSessions } from '@/entities/session';
import { SessionsControls } from '@/features/session/filter-sessions';
import { useUserSessionLogout } from '@/features/session/manage-sessions';
import { Section } from '@/shared/ui/section';

import { SessionsListBoundary } from './sessions-list';
import cls from './sessions-list.module.css';
import { SessionsStatusBarBoundary } from './sessions-status-bar';

function SessionsCount({ isLoading, total }: { isLoading: boolean; total: number }) {
	if (isLoading)
		return <Skeleton component='span' h={16} w={22} display='inline-block' />;

	return (
		<Text span c='dimmed'>
			(
			{total}
			)
		</Text>
	);
}

export function SessionsOverview() {
	const { data: sessionsData, isLoading } = useGetSessions();
	const sessions = useMemo(() => normalizeUserSessions(sessionsData?.data), [sessionsData?.data]);
	const sessionLogout = useUserSessionLogout();

	const headerActions = (
		<Group gap='sm' className={cls.actions}>
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
	);

	const title = (
		<>
			Активные сессии
			{' '}
			<SessionsCount isLoading={isLoading} total={sessions.length} />
		</>
	);

	return (
		<Section header={{ title, actions: headerActions }}>
			<Stack gap='xs'>
				<SessionsControls />
				<SessionsStatusBarBoundary />
			</Stack>

			<SessionsListBoundary />
		</Section>
	);
}
