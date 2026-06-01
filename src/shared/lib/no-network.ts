import { notifications } from '@mantine/notifications';
import { IconWifiOff } from '@tabler/icons-react';
import { createElement } from 'react';

export function showNoNetworkNotification() {
	notifications.show({
		title: 'Нет сети',
		message: 'Это действие недоступно в автономном режиме',
		color: 'yellow',
		icon: createElement(IconWifiOff, { size: 18 }),
	});
}
