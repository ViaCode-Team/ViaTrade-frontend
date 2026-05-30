import { Stack } from '@mantine/core';

import { SessionsSearch } from '@/features/session/search-sessions';

import { SessionsListBoundary } from './sessions-list';
import { SessionsListHeader } from './sessions-list-header';
import { SessionsStatusBarBoundary } from './sessions-status-bar';

export function SessionsOverview() {
	return (
		<Stack component='section' gap='md'>
			<SessionsListHeader />

			<Stack gap='xs'>
				<SessionsSearch />
				<SessionsStatusBarBoundary />
			</Stack>

			<SessionsListBoundary />
		</Stack>
	);
}
