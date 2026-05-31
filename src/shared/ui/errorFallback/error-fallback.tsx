import type { FallbackProps } from 'react-error-boundary';

import {
	Alert,
	Button,
	Group,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { IconAlertTriangle, IconRefresh, IconWorld } from '@tabler/icons-react';

import { NetworkError } from '@/shared/api/client/custom-instance-fetch';
import { useNetworkState } from '@/shared/lib/hooks';

import { OfflineFallback } from './offline-fallback';

export function ErrorFallback({
	error,
	resetErrorBoundary,
}: FallbackProps) {
	const theme = useMantineTheme();
	const { isOnline } = useNetworkState();

	const isOfflineError = !isOnline || error instanceof NetworkError;

	const handleReload = () => {
		window.location.reload();
	};

	if (isOfflineError) {
		return <OfflineFallback handleReload={handleReload} resetErrorBoundary={resetErrorBoundary} />;
	}

	return (
		<Alert
			icon={<IconAlertTriangle color={theme.colors.red[6]} />}
			title='Что-то пошло не так'
			variant='default'
		>
			<Text size='sm' mb='md'>
				Произошла непредвиденная ошибка. Пожалуйста, попробуйте еще раз позже.
			</Text>

			<Group gap='xs'>
				<Button
					leftSection={<IconWorld size={14} />}
					size='xs'
					onClick={handleReload}
					variant='default'
				>
					Перезагрузить страницу
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
