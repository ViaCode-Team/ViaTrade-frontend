import { Stack } from '@mantine/core';

import { ProfileInfoBoundary } from './ui/profile-info';
import { SessionsSection } from './ui/sessions-section';
import { ThirdPartyService } from './ui/third-party-services';

export function ProfilePage() {
	return (
		<>
			<Stack>
				<ProfileInfoBoundary />

				<ThirdPartyService />
			</Stack>

			<SessionsSection />
		</>
	);
}
