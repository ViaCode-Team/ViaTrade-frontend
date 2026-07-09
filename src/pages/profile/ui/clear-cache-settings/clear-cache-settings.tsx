import type { QueryClient } from '@tanstack/react-query';

import { Button, Stack, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

function openModalClearCache(queryClient: QueryClient) {
	modals.openConfirmModal({
		title: 'Очистка кэша приложения',
		centered: true,
		children: (
			<Text size='sm'>
				Все данные в кеше будут удалены. Приложение будет недоступно без интернета, пока вы не загрузите данные заново.
			</Text>
		),
		labels: { confirm: 'Очистить кэш', cancel: 'Отмена' },
		confirmProps: { color: 'red' },
		onConfirm: () => {
			queryClient.clear();
			notifications.show({
				title: 'Кэш очищен',
				message: 'Сохраненные данные удалены с устройства',
				color: 'green',
			});
		},
	});
}

export function ClearCacheSettings() {
	const queryClient = useQueryClient();

	return (
		<Stack gap='sm' align='flex-start'>
			<Text size='sm' c='dimmed'>
				Помогает освободить место на устройстве или исправить зависание устаревших данных.
			</Text>

			<Button
				variant='light'
				color='red'
				leftSection={<IconTrash size={16} />}
				onClick={() => openModalClearCache(queryClient)}
			>
				Очистить кэш
			</Button>
		</Stack>
	);
}
