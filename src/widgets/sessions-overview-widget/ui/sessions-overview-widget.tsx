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

import { SessionsOverviewListBoundary } from './sessions-overview-list';
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

export function SessionsOverviewWidget() {
	const { data: sessionsData, isLoading } = useGetSessions();
	const sessionsRaw = useMemo(() => normalizeUserSessions(sessionsData?.data), [sessionsData?.data]);
	const sessionLogout = useUserSessionLogout();

	const headerActions = (
		<Group gap='sm'>
			<Button
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
			<SessionsCount isLoading={isLoading} total={sessionsRaw.length} />
		</>
	);

	return (
		<Section header={{ title, actions: headerActions }}>
			<Stack gap='xs'>
				<SessionsControls />
				<SessionsStatusBarBoundary />
			</Stack>

			<SessionsOverviewListBoundary />
		</Section>
	);
}
