import { Stack } from '@mantine/core';

import { Section } from '@/shared/ui/section';
import { SessionsOverviewWidget } from '@/widgets/sessions-overview-widget';

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

			<SessionsOverviewWidget />
		</>
	);
}
