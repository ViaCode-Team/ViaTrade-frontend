import { SessionsOverview } from '@/pages/profile/ui/sessions-overview';
import { Section } from '@/shared/ui/section';

import { ClearCacheSettings } from './ui/clear-cache-settings';
import { ProfileInfoBoundary } from './ui/profile-info';
import { ThirdPartyService } from './ui/third-party-services';

export function ProfilePage() {
	return (
		<>
			<Section>
				<ProfileInfoBoundary />
			</Section>

			<Section header={{ title: 'Сторонние сервисы' }}>
				<ThirdPartyService />
			</Section>

			<SessionsOverview />

			<Section header={{ title: 'Настройки приложения' }}>
				<ClearCacheSettings />
			</Section>
		</>
	);
}
