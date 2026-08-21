import type { ReactNode } from 'react';

import {
	ActionIcon,
	Badge,
	Card,
	Group,
	Stack,
	Textarea,
	Tooltip,
} from '@mantine/core';
import '@mantine/dates/styles.css';
import { DateTimePicker } from '@mantine/dates';
import { IconArrowBackUp } from '@tabler/icons-react';
import { IconCalendarTime } from '@tabler/icons-react';
import { IconCircleCheck } from '@tabler/icons-react';
import { IconDeviceFloppy } from '@tabler/icons-react';
import { useState } from 'react';
import { generatePath, Link as RouterLink } from 'react-router';

import {
	DATE_TIME_DISPLAY_FORMAT,
	ROUTES,
} from '@/shared/model';

import type { RemindItem } from '../../model';

import { getReminderDateTimePickerValue } from '../../lib/remind-date-time';
import { useRemindDraft } from '../../lib/use-remind-draft';
import cls from './remind-card.module.css';

type RemindCardProps = {
	remind: RemindItem;
	onRemindChange: (
		remindId: string,
		updates: { text: string; date: string; time: string },
	) => void;
	action?: ReactNode;
	hideSourceBadge?: boolean;
};

export function RemindCard({
	remind,
	onRemindChange,
	action,
	hideSourceBadge,
}: RemindCardProps) {
	const [today] = useState(() => new Date());
	const {
		localDraft,
		isDirty,
		isValid,
		handleFieldChange,
		handleDateTimeChange,
		handleSave,
		handleReset,
	} = useRemindDraft({ remind, onRemindChange });

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
				{((!hideSourceBadge && remind.source?.label) || remind.deliveredAt) && (
					<Group mb={-4} gap='xs'>
						{!hideSourceBadge && remind.source?.label && (
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
						)}

						{remind.deliveredAt && (
							<Badge variant='light' color='teal' size='sm' leftSection={<IconCircleCheck size={12} />}>
								Доставлено
							</Badge>
						)}
					</Group>
				)}

				<Group align='flex-start' gap='xs' wrap='nowrap'>
					<Textarea
						value={localDraft.text}
						onChange={(event) => {
							handleFieldChange('text', event.currentTarget.value);
						}}
						placeholder='Текст напоминания...'
						aria-label='Текст напоминания'
						autosize
						minRows={4}
						maxRows={4}
						maxLength={1000}
						className={cls.textInput}
						withAsterisk
					/>

					<Stack gap='xs' className={cls.cardActions}>
						<Tooltip label='Сохранить изменения'>
							<ActionIcon
								variant='light'
								size='md'
								onClick={handleSave}
								disabled={!isDirty || !isValid}
								aria-label='Сохранить изменения'
							>
								<IconDeviceFloppy size={18} />
							</ActionIcon>
						</Tooltip>

						<Tooltip label='Сбросить изменения'>
							<ActionIcon
								variant='subtle'
								color='gray'
								size='md'
								onClick={handleReset}
								disabled={!isDirty}
								aria-label='Сбросить изменения'
							>
								<IconArrowBackUp size={18} />
							</ActionIcon>
						</Tooltip>

						{action}
					</Stack>
				</Group>

				<Group align='flex-start' gap='xs' wrap='nowrap'>
					<DateTimePicker
						style={{ flex: 1 }}
						placeholder='Дата и время'
						value={getReminderDateTimePickerValue(localDraft)}
						onChange={handleDateTimeChange}
						valueFormat={DATE_TIME_DISPLAY_FORMAT}
						defaultTimeValue={localDraft.time || '09:00'}
						leftSection={<IconCalendarTime size={16} />}
						leftSectionPointerEvents='none'
						timePickerProps={{ withDropdown: true }}
						minDate={today}
					/>
				</Group>
			</Stack>
		</Card>
	);
}
