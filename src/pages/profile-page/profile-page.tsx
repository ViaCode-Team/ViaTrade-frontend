import { Stack } from '@mantine/core';

import { Section } from '@/shared/ui/section';
import { SessionsOverview } from '@/widgets/sessions-overview';

import { ProfileInfoBoundary } from './ui/profile-info';
import { ThirdPartyService } from './ui/third-party-services';

export function ProfilePage() {
	return (
		<>
			<Stack>
				<Section header={{ title: 'Личные данные' }}>
					<ProfileInfoBoundary />
				</Section>

				<Section header={{ title: 'Связанные аккаунты' }}>
					<ThirdPartyService />
				</Section>
			</Stack>

			<SessionsOverview />
		</>
	);
}
