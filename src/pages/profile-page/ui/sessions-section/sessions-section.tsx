import { Stack } from '@mantine/core';
import { Suspense } from 'react';

import { SessionsList } from './sessions-list';
import { SessionsListHeader } from './sessions-list-header';
import { SessionsListSkeleton } from './sessions-list.skeleton';

export function SessionsSection() {
	return (
		<Stack component='section'>
			<SessionsListHeader />

			<Suspense fallback={<SessionsListSkeleton />}>
				<SessionsList />
			</Suspense>
		</Stack>
	);
}
