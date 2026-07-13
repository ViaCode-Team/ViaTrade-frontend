import type { ReactNode } from 'react';

import { Alert, Button, Group, Text } from '@mantine/core';
import { IconRefresh, IconWorld } from '@tabler/icons-react';

type ErrorAlertProps = {
	title: string;
	description: string;
	icon: ReactNode;
	onReload?: () => void;
	onRetry?: () => void;
	reloadLabel?: string;
	retryLabel?: string;
};

export function ErrorAlert({
	title,
	description,
	icon,
	onReload,
	onRetry,
	reloadLabel = 'Перезагрузить страницу',
	retryLabel = 'Повторить',
}: ErrorAlertProps) {
	return (
		<Alert icon={icon} title={title} variant='default'>
			<Text size='sm' mb='md'>
				{description}
			</Text>

			{(onReload || onRetry) && (
				<Group gap='xs'>
					{onReload && (
						<Button
							leftSection={<IconWorld size={14} />}
							size='xs'
							onClick={onReload}
							variant='default'
						>
							{reloadLabel}
						</Button>
					)}

					{onRetry && (
						<Button
							leftSection={<IconRefresh size={14} />}
							size='xs'
							onClick={onRetry}
						>
							{retryLabel}
						</Button>
					)}
				</Group>
			)}
		</Alert>
	);
}
