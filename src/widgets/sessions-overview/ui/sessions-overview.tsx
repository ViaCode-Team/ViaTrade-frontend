import { Stack } from '@mantine/core';

import { SessionsControls } from '@/features/session/filter-sessions';

import { SessionsListBoundary } from './sessions-list';
import { SessionsListHeader } from './sessions-list-header';
import { SessionsStatusBarBoundary } from './sessions-status-bar';

export function SessionsOverview() {
	return (
		<Stack component='section' gap='md'>
			<SessionsListHeader />

			<Stack gap='xs'>
				<SessionsControls />
				<SessionsStatusBarBoundary />
			</Stack>

			<SessionsListBoundary />
		</Stack>
	);
}
