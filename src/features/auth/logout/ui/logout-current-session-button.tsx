import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { useState } from 'react';

import { openLogoutConfirmation } from '../model/logout-confirmation';
import { useCurrentSessionLogout } from '../model/use-current-session-logout';

type LogoutCurrentSessionButtonProps = {
	placement?: 'paper-corner' | 'inline';
};

export function LogoutCurrentSessionButton({
	placement = 'paper-corner',
}: LogoutCurrentSessionButtonProps) {
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const logout = useCurrentSessionLogout();

	const handleLogout = () => {
		openLogoutConfirmation({
			title: 'Выйти из аккаунта?',
			description: 'Локальные данные будут удалены. При отсутствии сети завершение серверной сессии будет повторено после восстановления подключения.',
			confirmLabel: 'Выйти',
			onConfirm: () => {
				setIsLoggingOut(true);
				void logout().finally(() => {
					setIsLoggingOut(false);
				});
			},
		});
	};

	return (
		<Tooltip label='Выйти из аккаунта'>
			<ActionIcon
				color='red'
				variant='light'
				aria-label='Выйти из аккаунта'
				onClick={handleLogout}
				loading={isLoggingOut}
				disabled={isLoggingOut}
				style={placement === 'paper-corner' ? { position: 'absolute', top: 12, right: 12 } : undefined}
			>
				<IconLogout size={16} />
			</ActionIcon>
		</Tooltip>
	);
}
