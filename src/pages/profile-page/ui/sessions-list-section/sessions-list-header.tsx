import { Anchor, Button, Group, Text } from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router';

import classes from './sessions-list.module.css';

type SessionsListHeaderProps = {
	totalSessions: number;
	onLogoutAll: () => void;
	isLoggingOutAll?: boolean;
};

export function SessionsListHeader({
	totalSessions,
	onLogoutAll,
	isLoggingOutAll,
}: SessionsListHeaderProps) {
	return (
		<div className={classes.header}>
			<Text size='lg' fw={600}>
				Активные сессии
				<Text component='span' size='sm' c='dimmed' ml='xs'>
					(
					{totalSessions}
					)
				</Text>
			</Text>

			<Group gap='sm'>
				<Anchor
					component={RouterLink}
					to='/reset-password'
					size='sm'
					c='var(--mantine-color-brand-5)'
					fw={500}
				>
					Сбросить пароль
				</Anchor>

				<Button
					variant='outline'
					color='red'
					size='xs'
					leftSection={<IconLogout size={16} />}
					onClick={onLogoutAll}
					disabled={isLoggingOutAll}
				>
					Выйти из всех
				</Button>
			</Group>
		</div>
	);
}
