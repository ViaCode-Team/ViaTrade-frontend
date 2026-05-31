import { Button, Text } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconDownload, IconWifi } from '@tabler/icons-react';
import { type ReactNode, useEffect } from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';

export function PwaProvider({ children }: { children: ReactNode }) {
	const {
		offlineReady: [offlineReady, setOfflineReady],
		needRefresh: [needRefresh, setNeedRefresh],
		updateServiceWorker,
	} = useRegisterSW({
		onRegistered(r) {
			if (r) {
				// Периодически проверяем наличие обновлений (каждый час)
				setInterval(() => {
					r.update();
				}, 60 * 60 * 1000);
			}
		},
		onRegisterError(error) {
			console.error('Ошибка регистрации Service Worker:', error);
		},
	});

	useEffect(() => {
		if (needRefresh) {
			notifications.show({
				id: 'pwa-update',
				title: 'Доступно обновление',
				message: (
					<>
						<Text size='sm' mb='sm'>
							Новая версия приложения готова к установке.
						</Text>
						<Button
							size='xs'
							leftSection={<IconDownload size={16} />}
							onClick={() => updateServiceWorker(true)}
						>
							Обновить сейчас
						</Button>
					</>
				),
				color: 'blue',
				autoClose: false,
				withCloseButton: true,
				onClose: () => setNeedRefresh(false),
			});
		}
	}, [needRefresh, updateServiceWorker, setNeedRefresh]);

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
