import { Button } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { useAllSessionsLogout } from '../model/use-all-sessions-logout';

export function LogoutAllSessionsButton() {
	const sessionLogout = useAllSessionsLogout();

	return (
		<Button
			variant='outline'
			color='red'
			size='xs'
			leftSection={<IconLogout size={16} />}
			onClick={sessionLogout.requestLogoutAll}
			disabled={sessionLogout.isLoggingOutAll}
		>
			Выйти из всех
		</Button>
	);
}
