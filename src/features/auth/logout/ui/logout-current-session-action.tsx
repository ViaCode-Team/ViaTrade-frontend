import type { CSSProperties } from 'react';

import { ActionIcon, Tooltip } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';

import { useCurrentSessionLogout } from '../model/use-current-session-logout';

type LogoutCurrentSessionActionProps = {
	disabled?: boolean;
	style?: CSSProperties;
};

export function LogoutCurrentSessionAction({ disabled, style }: LogoutCurrentSessionActionProps) {
	const sessionLogout = useCurrentSessionLogout();
	const label = 'Выйти из текущей сессии';

	return (
		<Tooltip label={label}>
			<ActionIcon
				size='lg'
				variant='subtle'
				color='red'
				aria-label={label}
				onClick={sessionLogout.requestLogoutCurrentSession}
				disabled={disabled || sessionLogout.isLoggingOutCurrentSession}
				loading={sessionLogout.isLoggingOutCurrentSession}
				style={style}
			>
				<IconLogout size={20} />
			</ActionIcon>
		</Tooltip>
	);
}
