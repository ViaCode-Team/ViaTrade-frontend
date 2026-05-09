import {
	ActionIcon,
	Group,
	SimpleGrid,
	Stack,
	Text,
	Tooltip,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { brandGradient } from '@/shared/model/theme';

import type {
	NotificationEditableField,
	NotificationItem,
} from '../model';

import { NotificationCard } from './notification-card';
import cls from './notification-list.module.css';
import { NotificationListSkeleton } from './notification-list.skeleton';

type NotificationListProps = {
	notifications: NotificationItem[];
	isLoading?: boolean;
	onNotificationAdd: () => void;
	onNotificationChange: (
		notificationId: string,
		field: NotificationEditableField,
		value: string,
	) => void;
	onNotificationDuplicate: (notificationId: string) => void;
	onNotificationClearText: (notificationId: string) => void;
	onNotificationDelete: (notificationId: string) => void;
	emptyText?: string;
};

export function NotificationList({
	notifications,
	isLoading = false,
	onNotificationAdd,
	onNotificationChange,
	onNotificationDuplicate,
	onNotificationClearText,
	onNotificationDelete,
	emptyText = 'Уведомлений пока нет',
}: NotificationListProps) {
	const hasNotifications = notifications.length > 0;

	return (
		<Stack gap='md'>
			<Group justify='space-between' gap='sm' wrap='nowrap' className={cls.header}>
				<Text size='sm' c='dimmed'>
					{isLoading
						? 'Загружаем уведомления'
						: `Всего уведомлений: ${notifications.length}`}
				</Text>

				<Tooltip label='Добавить уведомление'>
					<ActionIcon
						variant='gradient'
						gradient={brandGradient}
						size='xl'
						aria-label='Добавить уведомление'
						onClick={onNotificationAdd}
					>
						<IconPlus size={18} />
					</ActionIcon>
				</Tooltip>
			</Group>

			{isLoading && !hasNotifications
				? (
						<NotificationListSkeleton />
					)
				: (
						<>
							{hasNotifications && (
								<SimpleGrid
									minColWidth={300}
									spacing={CONTENT_GRID_SPACING}
									component='ul'
								>
									{notifications.map((notification) => (
										<li key={notification.id}>
											<NotificationCard
												notification={notification}
												onNotificationChange={onNotificationChange}
												onNotificationDuplicate={onNotificationDuplicate}
												onNotificationClearText={onNotificationClearText}
												onNotificationDelete={onNotificationDelete}
											/>
										</li>
									))}
								</SimpleGrid>
							)}

							{!hasNotifications && (
								<Text size='sm' c='dimmed'>
									{emptyText}
								</Text>
							)}
						</>
					)}
		</Stack>
	);
}
