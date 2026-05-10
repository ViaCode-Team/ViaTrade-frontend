import type { FallbackProps } from 'react-error-boundary';

import {
	Alert,
	Button,
	Group,
	useMantineTheme,
} from '@mantine/core';
import { IconAlertTriangle, IconRefresh, IconWorld } from '@tabler/icons-react';

export function ErrorFallback({
	resetErrorBoundary,
}: FallbackProps) {
	const theme = useMantineTheme();

	const handleReload = () => {
		window.location.reload();
	};

	return (
		<Alert
			icon={<IconAlertTriangle color={theme.colors.red[6]} />}
			title='Что-то пошло не так'
			variant='default'
		>
			{/* todo: сообщение нормальное понятное для пользователя  */}

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
