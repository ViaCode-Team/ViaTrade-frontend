import { Stack } from '@mantine/core';

import { SessionsOverview } from '@/pages/profile-page/ui/sessions-overview';
import { Section } from '@/shared/ui/section';

import { ProfileInfoBoundary } from './ui/profile-info';
import { ThirdPartyService } from './ui/third-party-services';

export function ProfilePage() {
	return (
		<>
			<Stack>
				<Section header={{ title: 'Личные данные' }}>
					<ProfileInfoBoundary />
				</Section>

				<Section header={{ title: 'Сторонние сервисы' }}>
					<ThirdPartyService />
				</Section>
			</Stack>

			<SessionsOverview />
		</>
	);
}
