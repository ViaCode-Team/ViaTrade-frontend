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
	RemindEditableField,
	RemindItem,
} from '../model';

import cls from './remind-list.module.css';

type RemindCardProps = {
	remind: RemindItem;
	onRemindChange: (
		remindId: string,
		field: RemindEditableField,
		value: string,
	) => void;
	onRemindDuplicate: (remindId: string) => void;
	onRemindClearText: (remindId: string) => void;
	onRemindDelete: (remindId: string) => void;
};

export function RemindCard({
	remind,
	onRemindChange,
	onRemindDuplicate,
	onRemindClearText,
	onRemindDelete,
}: RemindCardProps) {
	const handleFieldChange = (field: RemindEditableField, value: string) => {
		onRemindChange(remind.id, field, value);
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
			aria-label='Карточка напоминания'
			className={cls.card}
		>
			<Stack gap='xs'>
				<Group align='flex-start' gap='xs' wrap='nowrap'>
					<Textarea
						value={remind.text}
						onChange={(event) => {
							handleFieldChange('text', event.currentTarget.value);
						}}
						placeholder='Что нужно напомнить'
						aria-label='Текст напоминания'
						autosize
						minRows={4}
						maxRows={4}
						maxLength={1000}
						className={cls.textInput}
						withAsterisk
					/>

					<Stack gap='xs' className={cls.cardActions}>
						<Tooltip label='Удалить напоминание'>
							<ActionIcon
								variant='subtle'
								color='red'
								size='md'
								aria-label='Удалить напоминание'
								onClick={() => {
									onRemindDelete(remind.id);
								}}
							>
								<IconTrash size={18} />
							</ActionIcon>
						</Tooltip>

						<Tooltip label='Дублировать напоминание'>
							<ActionIcon
								variant='subtle'
								color='gray'
								size='md'
								aria-label='Дублировать напоминание'
								onClick={() => {
									onRemindDuplicate(remind.id);
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
								aria-label='Очистить текст напоминания'
								onClick={() => {
									onRemindClearText(remind.id);
								}}
							>
								<IconEraser size={18} />
							</ActionIcon>
						</Tooltip>


					</Stack>
				</Group>

				<DateTimePicker
					placeholder='Выберите дату и время'
					value={getDateTimePickerValue(remind)}
					onChange={handleDateTimeChange}
					valueFormat='DD.MM.YYYY HH:mm'
					defaultTimeValue={remind.time || '09:00'}
					leftSection={<IconCalendarTime size={16} />}
					leftSectionPointerEvents='none'
					timePickerProps={{ withDropdown: true }}
				/>
			</Stack>
		</Card>
	);
}

function getDateTimePickerValue(remind: RemindItem) {
	if (!remind.date || !remind.time) {
		return null;
	}

	return `${remind.date} ${remind.time}:00`;
}
