import {
	Alert,
	Button,
	Group,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { IconRefresh, IconWifiOff, IconWorld } from '@tabler/icons-react';

type OfflineFallbackProps = {
	handleReload: () => void;
	resetErrorBoundary: () => void;
};

export function OfflineFallback({ handleReload, resetErrorBoundary }: OfflineFallbackProps) {
	const theme = useMantineTheme();

	return (
		<Alert
			icon={<IconWifiOff color={theme.colors.yellow[6]} />}
			title='Нет подключения к сети'
			variant='default'
		>
			<Text size='sm' mb='md'>
				Эта страница или функция недоступна в автономном режиме. Пожалуйста, проверьте подключение и попробуйте снова.
			</Text>

			<Group gap='xs'>
				<Button
					leftSection={<IconWorld size={14} />}
					size='xs'
					onClick={handleReload}
					variant='default'
				>
					Обновить страницу
				</Button>

				<Button
					leftSection={<IconRefresh size={14} />}
					size='xs'
					onClick={resetErrorBoundary}
				>
					Повторить
				</Button>
			</Group>
		</Alert>
	);
}
