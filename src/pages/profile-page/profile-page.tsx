import { Stack } from '@mantine/core';

import classes from './profile-page.module.css';
import { ProfileInfo } from './ui/profile-info';
import { SessionsListSection } from './ui/sessions-list-section';

export function ProfilePage() {
	return (
		<Stack gap='xl' className={classes.root}>
			<ProfileInfo />
			<SessionsListSection />
		</Stack>
	);
}
