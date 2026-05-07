import { useState } from 'react';

import type { NoteFormData, PersonalNote } from '../model';

import { createPersonalNote } from '../model';

type UsePersonalNoteOptions = {
	value?: string;
	defaultValue?: string;
	onValueChange?: (value: string) => void;
	onNoteSave?: (note: PersonalNote) => void;
};

type UsePersonalNoteReturn = {
	noteText: string;
	savedValue: string;
	noteFormProps: {
		value: string;
		savedValue: string;
		onValueChange: (value: string) => void;
		onSubmit: (formData: NoteFormData) => void;
	};
};

export function usePersonalNote({
	value,
	defaultValue = '',
	onValueChange,
	onNoteSave,
}: UsePersonalNoteOptions = {}): UsePersonalNoteReturn {
	const [localValue, setLocalValue] = useState(defaultValue);
	const [savedValue, setSavedValue] = useState(defaultValue);
	const noteText = value ?? localValue;

	const handleNoteTextChange = (nextValue: string) => {
		if (value === undefined) {
			setLocalValue(nextValue);
		}

		onValueChange?.(nextValue);
	};

	const handleNoteSubmit = (formData: NoteFormData) => {
		const nextNote = createPersonalNote(formData);

		setSavedValue(nextNote.text);
		onNoteSave?.(nextNote);
	};

	return {
		noteText,
		savedValue,
		noteFormProps: {
			value: noteText,
			savedValue,
			onValueChange: handleNoteTextChange,
			onSubmit: handleNoteSubmit,
		},
	};
}
