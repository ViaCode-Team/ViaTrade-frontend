import { Stack } from '@mantine/core';

import cls from './profile-page.module.css';
import { ProfileInfo } from './ui/profile-info';
import { SessionsListSection } from './ui/sessions-list-section';

export function ProfilePage() {
	return (
		<Stack gap='xl' className={cls.root}>
			<ProfileInfo />
			<SessionsListSection />
		</Stack>
	);
}
