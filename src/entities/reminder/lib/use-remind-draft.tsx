import { useEffect, useMemo, useState } from 'react';

import { isAppLocked, secureGetItem, secureRemoveItem, secureSetItem } from '@/shared/lib/secure-storage';
import { createStorageKey } from '@/shared/lib/storage-key';

import type { RemindEditableField, RemindItem } from '../model';

type RemindUpdates = {
	text: string;
	date: string;
	time: string;
};

type RemindDraft = RemindUpdates;

type UseRemindDraftOptions = {
	remind: RemindItem;
	onRemindChange: (
		remindId: string,
		updates: RemindUpdates,
		onSuccess?: () => void,
	) => void;
};

function getRemindDraftStorageKey(remindId: string) {
	return createStorageKey('reminds', 'drafts', remindId);
}

export function useRemindDraft({ remind, onRemindChange }: UseRemindDraftOptions) {
	const storageKey = getRemindDraftStorageKey(remind.id);
	const defaultDraft = useMemo(() => getDefaultDraft(remind), [remind]);
	const [storedDraft, setStoredDraft] = useState<{
		draft: RemindDraft;
		storageKey: string;
	} | null>(null);
	const localDraft = storedDraft?.storageKey === storageKey
		? storedDraft.draft
		: defaultDraft;

	useEffect(() => {
		let isActive = true;

		const loadDraft = async () => {
			const storedDraft = await getStoredRemindDraft(storageKey);

			if (isActive && storedDraft) {
				setStoredDraft({ storageKey, draft: storedDraft });
			}
		};

		void loadDraft();

		return () => {
			isActive = false;
		};
	}, [storageKey]);

	const isDirty
		= localDraft.text !== remind.text
			|| localDraft.date !== remind.date
			|| localDraft.time !== remind.time;

	const handleFieldChange = (field: RemindEditableField, value: string) => {
		const nextDraft = { ...localDraft, [field]: value };

		setStoredDraft({ storageKey, draft: nextDraft });
		void saveStoredRemindDraft(storageKey, nextDraft);
	};

	const handleDateTimeChange = (value: string | null) => {
		if (value === null) {
			const nextDraft = { ...localDraft, date: '', time: '' };

			setStoredDraft({ storageKey, draft: nextDraft });
			void saveStoredRemindDraft(storageKey, nextDraft);
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

		const nextDraft = { ...localDraft, date, time };

		setStoredDraft({ storageKey, draft: nextDraft });
		void saveStoredRemindDraft(storageKey, nextDraft);
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

		onRemindChange(
			remind.id,
			{
				text: localDraft.text,
				date: localDraft.date,
				time: localDraft.time,
			},
			() => {
				void removeStoredRemindDraft(storageKey);
			},
		);
	};

	const handleReset = () => {
		void removeStoredRemindDraft(storageKey);
		setStoredDraft({ storageKey, draft: defaultDraft });
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

async function getStoredRemindDraft(storageKey: string) {
	const encryptedValue = await secureGetItem(storageKey);

	if (encryptedValue) {
		removeLegacyRemindDraft(storageKey);
		return parseRemindDraft(encryptedValue);
	}

	if (isAppLocked()) {
		return null;
	}

	const legacyValue = getLegacyRemindDraft(storageKey);
	if (!legacyValue) {
		return null;
	}

	const legacyDraft = parseRemindDraft(legacyValue);
	if (!legacyDraft) {
		removeLegacyRemindDraft(storageKey);
		return null;
	}

	await saveStoredRemindDraft(storageKey, legacyDraft);

	return legacyDraft;
}

async function saveStoredRemindDraft(storageKey: string, draft: RemindDraft) {
	await secureSetItem(storageKey, JSON.stringify(draft));
	removeLegacyRemindDraft(storageKey);
}

async function removeStoredRemindDraft(storageKey: string) {
	await secureRemoveItem(storageKey);
	removeLegacyRemindDraft(storageKey);
}

function getDefaultDraft(remind: RemindItem): RemindDraft {
	return {
		text: remind.text,
		date: remind.date,
		time: remind.time,
	};
}

function getLegacyRemindDraft(storageKey: string) {
	if (!canUseLocalStorage()) {
		return null;
	}

	return window.localStorage.getItem(storageKey);
}

function removeLegacyRemindDraft(storageKey: string) {
	if (!canUseLocalStorage()) {
		return;
	}

	window.localStorage.removeItem(storageKey);
}

function parseRemindDraft(value: string): RemindDraft | null {
	try {
		const parsedValue: unknown = JSON.parse(value);

		if (!parsedValue || typeof parsedValue !== 'object') {
			return null;
		}

		const draft = parsedValue as Partial<RemindDraft>;

		if (
			typeof draft.text !== 'string'
			|| typeof draft.date !== 'string'
			|| typeof draft.time !== 'string'
		) {
			return null;
		}

		return {
			text: draft.text,
			date: draft.date,
			time: draft.time,
		};
	}
	catch {
		return null;
	}
}

function canUseLocalStorage() {
	return typeof window !== 'undefined' && 'localStorage' in window;
}
