import { Stack } from '@mantine/core';
import { Suspense } from 'react';

import { ProfileInfo, ProfileInfoSkeleton } from './ui/profile-info';
import { SessionsListSection } from './ui/sessions-list-section';

export function ProfilePage() {
	return (
		<Stack gap='xl'>
			<Suspense fallback={<ProfileInfoSkeleton />}>
				<ProfileInfo />
			</Suspense>
			<SessionsListSection />
		</Stack>
	);
}
