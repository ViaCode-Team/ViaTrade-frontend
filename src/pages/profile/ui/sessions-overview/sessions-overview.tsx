import {
	Group,
	Skeleton,
	Stack,
	Text,
} from '@mantine/core';
import { useMemo } from 'react';

import { useGetSessions } from '@/entities/auth';
import { LogoutAllSessionsButton } from '@/features/auth/logout';
import { SessionsControls } from '@/pages/profile/ui/filter-sessions';
import { Section } from '@/shared/ui/section';

import { normalizeUserSessions } from '../session-entity';
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

export function SessionsOverview() {
	const { data: sessionsData, isLoading } = useGetSessions();
	const sessionsRaw = useMemo(() => normalizeUserSessions(sessionsData?.data), [sessionsData?.data]);

	const headerActions = (
		<Group gap='sm'>
			<LogoutAllSessionsButton disabled={isLoading} />
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
