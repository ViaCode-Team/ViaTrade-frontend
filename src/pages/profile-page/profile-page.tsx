import { Stack } from '@mantine/core';
import { Suspense } from 'react';

import { ProfileInfo, ProfileInfoSkeleton } from './ui/profile-info';
import { SessionsSection } from './ui/sessions-section';
import { ThirdPartyService } from './ui/third-party-services';

export function ProfilePage() {
	return (
		<>
			<Stack>
				<Suspense fallback={<ProfileInfoSkeleton />}>
					<ProfileInfo />
				</Suspense>

				<ThirdPartyService />
			</Stack>

			<SessionsSection />
		</>
	);
}
