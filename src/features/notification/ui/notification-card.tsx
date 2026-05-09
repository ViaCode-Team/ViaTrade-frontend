import {
	ActionIcon,
	Card,
	Group,
	Stack,
	Textarea,
	Tooltip,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import {
	IconCalendarTime,
	IconCopy,
	IconEraser,
	IconTrash,
} from '@tabler/icons-react';

import type {
	NotificationEditableField,
	NotificationItem,
} from '../model';

import cls from './notification-list.module.css';

type NotificationCardProps = {
	notification: NotificationItem;
	onNotificationChange: (
		notificationId: string,
		field: NotificationEditableField,
		value: string,
	) => void;
	onNotificationDuplicate: (notificationId: string) => void;
	onNotificationClearText: (notificationId: string) => void;
	onNotificationDelete: (notificationId: string) => void;
};

export function NotificationCard({
	notification,
	onNotificationChange,
	onNotificationDuplicate,
	onNotificationClearText,
	onNotificationDelete,
}: NotificationCardProps) {
	const handleFieldChange = (field: NotificationEditableField, value: string) => {
		onNotificationChange(notification.id, field, value);
	};
	const handleDateTimeChange = (value: string | null) => {
		if (value === null) {
			handleFieldChange('date', '');
			handleFieldChange('time', '');
			return;
		}

		const [date = '', timeWithSeconds = ''] = value.split(' ');

		handleFieldChange('date', date);
		handleFieldChange('time', timeWithSeconds.slice(0, 5));
	};

	return (
		<Card
			component='article'
			bg='transparent'
			withBorder
			padding='sm'
			aria-label='Карточка уведомления'
			className={cls.card}
		>
			<Stack gap='xs'>
				<Group align='flex-start' gap='xs' wrap='nowrap'>
					<Textarea
						value={notification.text}
						onChange={(event) => {
							handleFieldChange('text', event.currentTarget.value);
						}}
						placeholder='Что нужно напомнить'
						aria-label='Текст уведомления'
						autosize
						minRows={4}
						maxRows={4}
						maxLength={1000}
						className={cls.textInput}
						withAsterisk
					/>

					<Stack gap='xs' className={cls.cardActions}>
						<Tooltip label='Удалить уведомление'>
							<ActionIcon
								variant='subtle'
								color='red'
								size='md'
								aria-label='Удалить уведомление'
								onClick={() => {
									onNotificationDelete(notification.id);
								}}
							>
								<IconTrash size={18} />
							</ActionIcon>
						</Tooltip>

						<Tooltip label='Дублировать уведомление'>
							<ActionIcon
								variant='subtle'
								color='gray'
								size='md'
								aria-label='Дублировать уведомление'
								onClick={() => {
									onNotificationDuplicate(notification.id);
								}}
							>
								<IconCopy size={18} />
							</ActionIcon>
						</Tooltip>

						<Tooltip label='Очистить текст'>
							<ActionIcon
								variant='subtle'
								color='gray'
								size='md'
								aria-label='Очистить текст уведомления'
								onClick={() => {
									onNotificationClearText(notification.id);
								}}
							>
								<IconEraser size={18} />
							</ActionIcon>
						</Tooltip>


					</Stack>
				</Group>

				<DateTimePicker
					placeholder='Выберите дату и время'
					value={getDateTimePickerValue(notification)}
					onChange={handleDateTimeChange}
					valueFormat='DD.MM.YYYY HH:mm'
					defaultTimeValue={notification.time || '09:00'}
					leftSection={<IconCalendarTime size={16} />}
					leftSectionPointerEvents='none'
					timePickerProps={{ withDropdown: true }}
				/>
			</Stack>
		</Card>
	);
}

function getDateTimePickerValue(notification: NotificationItem) {
	if (!notification.date || !notification.time) {
		return null;
	}

	return `${notification.date} ${notification.time}:00`;
}
