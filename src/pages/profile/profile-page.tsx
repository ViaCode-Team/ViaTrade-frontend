import { Stack } from '@mantine/core';

import { SessionsOverview } from '@/pages/profile/ui/sessions-overview';
import { DataFreshness } from '@/shared/ui/data-freshness';
import { Section } from '@/shared/ui/section';

import { ClearCacheSettings } from './ui/clear-cache-settings';
import { ProfileInfoBoundary } from './ui/profile-info';
import { ThirdPartyService } from './ui/third-party-services';

export function ProfilePage() {
	return (
		<>
			<Stack>
				<Section
					header={{
						title: 'Личные данные',
						actions: <DataFreshness />,
					}}
				>
					<ProfileInfoBoundary />
				</Section>

				<Section header={{ title: 'Сторонние сервисы' }}>
					<ThirdPartyService />
				</Section>
			</Stack>

			<SessionsOverview />

			<Section header={{ title: 'Настройки приложения' }}>
				<ClearCacheSettings />
			</Section>
		</>
	);
}
