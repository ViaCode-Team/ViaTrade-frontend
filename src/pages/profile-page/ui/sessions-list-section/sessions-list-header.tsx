import {
	Anchor,
	Button,
	Group,
	Skeleton,
	Text,
	Title,
} from '@mantine/core';
import { IconLogout } from '@tabler/icons-react';
import { Link as RouterLink } from 'react-router';

import cls from './sessions-list.module.css';

type SessionsListHeaderProps = {
	totalSessions: number;
	onLogoutAll: () => void;
	isLoggingOutAll?: boolean;
	isLoading?: boolean;
};

export function SessionsListHeader({
	totalSessions,
	onLogoutAll,
	isLoggingOutAll,
	isLoading,
}: SessionsListHeaderProps) {
	return (
		<div className={cls.header}>
			<Title order={4}>
				Активные сессии
				{' '}
				<Text span size='sm' c='dimmed'>
					{isLoading
						? <Skeleton component='span' h={16} w={22} display='inline-block' />
						: `(${totalSessions})`}
				</Text>
			</Title>

			<Group gap='sm'>
				<Anchor
					component={RouterLink}
					to='/reset-password'
					size='sm'
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
					disabled={isLoading || isLoggingOutAll}
				>
					Выйти из всех
				</Button>
			</Group>
		</div>
	);
}
