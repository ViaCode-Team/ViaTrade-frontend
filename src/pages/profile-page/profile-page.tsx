import { Stack } from '@mantine/core';

import { ProfileInfo } from './ui/profile-info';
import { SessionsListSection } from './ui/sessions-list-section';

export function ProfilePage() {
	return (
		<Stack gap='xl'>
			<ProfileInfo />
			<SessionsListSection />
		</Stack>
	);
}
