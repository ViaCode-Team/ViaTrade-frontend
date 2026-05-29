import { useDebouncedCallback } from '@mantine/hooks';
import { useState } from 'react';

import type { RemindEditableField, RemindItem } from '../model';

type RemindUpdates = {
	text: string;
	date: string;
	time: string;
};

type UseRemindDraftOptions = {
	remind: RemindItem;
	onRemindChange: (
		remindId: string,
		updates: RemindUpdates,
	) => void;
};

export function useRemindDraft({ remind, onRemindChange }: UseRemindDraftOptions) {
	const [localDraft, setLocalDraft] = useState(() => {
		try {
			const stored = localStorage.getItem(`via-remind-draft-${remind.id}`);
			if (stored) {
				return JSON.parse(stored);
			}
		}
		catch {}

		return {
			text: remind.text,
			date: remind.date,
			time: remind.time,
		};
	});

	const isDirty
		= localDraft.text !== remind.text
			|| localDraft.date !== remind.date
			|| localDraft.time !== remind.time;

	const debouncedSaveToStorage = useDebouncedCallback((draftValue) => {
		localStorage.setItem(`via-remind-draft-${remind.id}`, JSON.stringify(draftValue));
	}, 600);

	const handleFieldChange = (field: RemindEditableField, value: string) => {
		const nextDraft = { ...localDraft, [field]: value };
		setLocalDraft(nextDraft);
		debouncedSaveToStorage(nextDraft);
	};

	const handleDateTimeChange = (value: string | null) => {
		if (value === null) {
			handleFieldChange('date', '');
			handleFieldChange('time', '');
			return;
		}

		const [date = '', timeWithSeconds = ''] = value.split(' ');
		let time = timeWithSeconds.slice(0, 5);

		// Не даем поставить время в прошлом, если выбран сегодняшний день
		const now = new Date();
		const [year, month, day] = date.split('-');

		if (year && month && day) {
			const isToday
				= Number(year) === now.getFullYear()
					&& Number(month) - 1 === now.getMonth()
					&& Number(day) === now.getDate();

			if (isToday) {
				const [hours, minutes] = time.split(':');
				const selectedDateTime = new Date(now.getTime());
				selectedDateTime.setHours(Number(hours), Number(minutes), 0, 0);

				if (selectedDateTime < now) {
					const currentHours = String(now.getHours()).padStart(2, '0');
					const currentMinutes = String(now.getMinutes()).padStart(2, '0');
					time = `${currentHours}:${currentMinutes}`;
				}
			}
		}

		const nextDraft = {
			...localDraft,
			date,
			time,
		};
		setLocalDraft(nextDraft);
		debouncedSaveToStorage(nextDraft);
	};

	const isFutureDate = () => {
		if (!localDraft.date || !localDraft.time)
			return false;

		const now = new Date();
		// remind.date is YYYY-MM-DD
		const [year, month, day] = localDraft.date.split('-');
		const [hours, minutes] = localDraft.time.split(':');

		if (!year || !month || !day || !hours || !minutes)
			return false;

		const selectedDate = new Date(
			Number(year),
			Number(month) - 1,
			Number(day),
			Number(hours),
			Number(minutes),
		);

		return selectedDate > now;
	};

	const isValid = Boolean(
		localDraft.text.trim() && localDraft.date && localDraft.time && isFutureDate(),
	);

	const handleSave = () => {
		if (!isValid) {
			return;
		}

		debouncedSaveToStorage.cancel();
		localStorage.removeItem(`via-remind-draft-${remind.id}`);

		onRemindChange(remind.id, {
			text: localDraft.text,
			date: localDraft.date,
			time: localDraft.time,
		});
	};

	const handleReset = () => {
		debouncedSaveToStorage.cancel();
		localStorage.removeItem(`via-remind-draft-${remind.id}`);
		setLocalDraft({ text: remind.text, date: remind.date, time: remind.time });
	};

	return {
		localDraft,
		isDirty,
		isValid,
		handleFieldChange,
		handleDateTimeChange,
		handleSave,
		handleReset,
	};
}
