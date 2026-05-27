import {
	Badge,
	Card,
	Group,
	Stack,
	Textarea,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { IconCalendarTime } from '@tabler/icons-react';
import { generatePath, Link as RouterLink } from 'react-router';

import type {
	RemindEditableField,
	RemindItem,
} from '@/entities/remind';

import { ROUTES } from '@/shared/model/routes';

import cls from './remind-card.module.css';

type RemindCardProps = {
	remind: RemindItem;
	onRemindChange: (
		remindId: string,
		field: RemindEditableField,
		value: string,
	) => void;
	actionSlot?: React.ReactNode;
	hideSourceBadge?: boolean;
};

export function RemindCard({
	remind,
	onRemindChange,
	actionSlot,
	hideSourceBadge,
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
				{!hideSourceBadge && remind.source?.label && (
					<Group mb={-4}>
						<Badge
							variant='default'
							size='sm'
							autoContrast
							component={RouterLink}
							to={generatePath(ROUTES.STOCK, { stockId: remind.source.id })}
							style={{ cursor: 'pointer', textDecoration: 'none' }}
						>
							Акция:
							{' '}
							{remind.source.label}
						</Badge>
					</Group>
				)}

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

					{actionSlot && (
						<Stack gap='xs' className={cls.cardActions}>
							{actionSlot}
						</Stack>
					)}
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
