import { Alert, Text } from '@mantine/core';
import { IconWifiOff } from '@tabler/icons-react';

import { useSecurity } from '@/entities/security';

export function OfflineBanner() {
	const { isOffline } = useSecurity();

	if (!isOffline) {
		return null;
	}

	return (
		<Alert
			variant='light'
			color='yellow'
			p='xs'
			icon={<IconWifiOff size={18} />}
		>
			<Text size='sm'>Приложение работает в автономном режиме, некоторые функции могут быть недоступны.</Text>
		</Alert>
	);
}
