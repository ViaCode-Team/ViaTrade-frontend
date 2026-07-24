import { notifications } from '@mantine/notifications';
import { IconWifi } from '@tabler/icons-react';
import { type ReactNode, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

import { milliseconds } from '@/shared/lib/milliseconds';

export function PwaProvider({ children }: { children: ReactNode }) {
	const {
		offlineReady: [offlineReady, setOfflineReady],
	} = useRegisterSW();

	useEffect(() => {
		if (offlineReady) {
			notifications.show({
				id: 'pwa-offline-ready',
				title: 'Готово к работе офлайн',
				message: 'Теперь приложение может работать в автономном режиме.',
				color: 'teal',
				icon: <IconWifi size={18} />,
				autoClose: milliseconds.fromSeconds(5),
				onClose: () => setOfflineReady(false),
			});
		}
	}, [offlineReady, setOfflineReady]);

	return <>{children}</>;
}
