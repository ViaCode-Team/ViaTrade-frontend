import { Stack } from '@mantine/core';

import { SessionsSearch } from '@/features/session/search-sessions';

import { SessionsListBoundary } from './sessions-list';
import { SessionsListHeader } from './sessions-list-header';

export function SessionsOverview() {
	return (
		<Stack component='section'>
			<SessionsListHeader />
			<SessionsSearch />
			<SessionsListBoundary />
		</Stack>
	);
}
