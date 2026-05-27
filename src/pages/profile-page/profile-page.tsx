import { Stack } from '@mantine/core';

import { SessionsOverview } from '@/widgets/sessions-overview';

import { ProfileInfoBoundary } from './ui/profile-info';
import { ThirdPartyService } from './ui/third-party-services';

export function ProfilePage() {
	return (
		<>
			<Stack>
				<ProfileInfoBoundary />

				<ThirdPartyService />
			</Stack>

			<SessionsOverview />
		</>
	);
}
