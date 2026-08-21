import type { SubmitEvent } from 'react';

import {
	Alert,
	Button,
	Group,
	Stack,
	Textarea,
	TextInput,
} from '@mantine/core';
import '@mantine/dates/styles.css';
import { DateTimePicker } from '@mantine/dates';
import { modals } from '@mantine/modals';
import { IconAlertTriangle } from '@tabler/icons-react';
import { useState } from 'react';

import {
	getReminderDateTimeAsIso,
} from '@/entities/reminder';
import { DATE_TIME_DISPLAY_FORMAT } from '@/shared/model';

import type { CreateRemindInstrument } from '../model/remind-instrument';

import { useCreateRemind } from '../lib/use-create-remind';
import { useReminderDateTime } from '../lib/use-reminder-date-time';
import { RemindInstrumentSelect } from './remind-instrument-select';

type CreateRemindFormProps = {
	instrument?: CreateRemindInstrument;
};

export function CreateRemindForm({ instrument }: CreateRemindFormProps) {
	const [selectedInstrumentId, setSelectedInstrumentId] = useState<number | null>(instrument?.id ?? null);
	const [text, setText] = useState('');
	const {
		value: remindAt,
		setValue: setRemindAt,
		minimumDate,
		isValid: isReminderDateTimeValid,
	} = useReminderDateTime();
	const { createRemind, error, isPending } = useCreateRemind();
	const canSubmit = Boolean(selectedInstrumentId && text.trim() && isReminderDateTimeValid);

	const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (!selectedInstrumentId || !text.trim() || !remindAt || !isReminderDateTimeValid) {
			return;
		}

		createRemind({
			instrumentId: selectedInstrumentId,
			text: text.trim(),
			remindAt: getReminderDateTimeAsIso(remindAt),
			onSuccess: () => modals.closeAll(),
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<Stack gap='md'>
				{instrument
					? (
							<TextInput label='Акция' value={instrument.label} readOnly />
						)
					: (
							<RemindInstrumentSelect
								value={selectedInstrumentId}
								onChange={setSelectedInstrumentId}
							/>
						)}

				<Textarea
					label='Сообщение'
					placeholder='Текст напоминания'
					value={text}
					onChange={(event) => setText(event.currentTarget.value)}
					autosize
					minRows={3}
					maxRows={6}
					maxLength={1000}
					withAsterisk
					autoFocus
				/>

				<DateTimePicker
					label='Дата и время'
					placeholder='Выберите дату и время'
					value={remindAt}
					onChange={setRemindAt}
					valueFormat={DATE_TIME_DISPLAY_FORMAT}
					minDate={minimumDate}
					timePickerProps={{ withDropdown: true }}
					error={!isReminderDateTimeValid && 'Выберите дату и время в будущем'}
					withAsterisk
				/>

				{error && (
					<Alert
						color='orange'
						variant='light'
						title={error.title}
						icon={<IconAlertTriangle size={18} />}
					>
						{error.message}
					</Alert>
				)}

				<Group justify='flex-end' mt='md'>
					<Button variant='default' onClick={() => modals.closeAll()}>
						Отмена
					</Button>
					<Button type='submit' disabled={!canSubmit} loading={isPending}>
						Создать
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
