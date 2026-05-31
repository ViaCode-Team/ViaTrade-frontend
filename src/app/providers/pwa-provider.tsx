import { notifications } from '@mantine/notifications';
import { IconWifi } from '@tabler/icons-react';
import { type ReactNode, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function PwaProvider({ children }: { children: ReactNode }) {
	const {
		offlineReady: [offlineReady, setOfflineReady],
	} = useRegisterSW();

	useEffect(() => {
		if (offlineReady) {
			notifications.show({
				id: 'pwa-offline-ready',
				title: 'Готово к работе офлайн',
				message: 'Приложение было успешно закешировано и теперь может работать без интернета.',
				color: 'teal',
				icon: <IconWifi size={18} />,
				autoClose: 5000,
				onClose: () => setOfflineReady(false),
			});
		}
	}, [offlineReady, setOfflineReady]);

	return <>{children}</>;
}
