import { Stack } from '@mantine/core';

import { SessionsListBoundary } from './sessions-list';
import { SessionsListHeader } from './sessions-list-header';

export function SessionsSection() {
	return (
		<Stack component='section'>
			<SessionsListHeader />

			<SessionsListBoundary />
		</Stack>
	);
}
