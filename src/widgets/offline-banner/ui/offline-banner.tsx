import { Alert, Text } from '@mantine/core';
import { IconWifiOff } from '@tabler/icons-react';

import { useNetworkState } from '@/shared/lib/hooks';

export function OfflineBanner() {
	const { isOnline } = useNetworkState();

	if (isOnline) {
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
