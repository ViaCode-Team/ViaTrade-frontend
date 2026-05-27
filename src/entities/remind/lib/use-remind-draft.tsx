import { useDebouncedCallback } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCheck } from '@tabler/icons-react';
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

		const nextDraft = {
			...localDraft,
			date,
			time: timeWithSeconds.slice(0, 5),
		};
		setLocalDraft(nextDraft);
		debouncedSaveToStorage(nextDraft);
	};

	const isValid = Boolean(localDraft.text.trim() && localDraft.date && localDraft.time);

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

		notifications.show({
			title: 'Сохранено',
			message: 'Напоминание успешно сохранено',
			color: 'green',
			icon: <IconCheck size={18} />,
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
