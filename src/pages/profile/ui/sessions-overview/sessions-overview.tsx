import { LogoutAllSessionsButton } from '@/features/auth/logout';
import { Section } from '@/shared/ui/section';

import { SessionsOverviewListBoundary } from './sessions-overview-list';

export function SessionsOverview() {
	return (
		<Section
			header={{
				title: 'Активные сессии',
				actions: <LogoutAllSessionsButton />,
			}}
		>
			<SessionsOverviewListBoundary />
		</Section>
	);
}
