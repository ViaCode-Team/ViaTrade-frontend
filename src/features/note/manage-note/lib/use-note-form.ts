import { type SubmitEvent, useState } from 'react';

import {
	getNormalizedNoteFormData,
	getNoteFormErrors,
	type NoteFormData,
	validateNoteForm,
} from '@/entities/note';

type NoteFormErrors = Partial<Record<keyof NoteFormData, string>>;

type UseNoteFormOptions = {
	value: string;
	savedValue: string;
	onValueChange: (value: string) => void;
	onSubmit: (formData: NoteFormData) => void;
};

type UseNoteFormReturn = {
	formData: NoteFormData;
	errors: NoteFormErrors;
	isSubmitDisabled: boolean;
	isResetDisabled: boolean;
	setField: (field: keyof NoteFormData, value: string) => void;
	reset: () => void;
	submit: (event: SubmitEvent<HTMLFormElement>) => void;
};

export function useNoteForm({
	value,
	savedValue,
	onValueChange,
	onSubmit,
}: UseNoteFormOptions): UseNoteFormReturn {
	const [errors, setErrors] = useState<NoteFormErrors>({});
	const formData: NoteFormData = { text: value };

	const normalizedText = getNormalizedNoteFormData(formData).text;
	const normalizedSavedText = getNormalizedNoteFormData({ text: savedValue }).text;
	const isSubmitDisabled = normalizedText.length === 0 || normalizedText === normalizedSavedText;
	const isResetDisabled = normalizedText === normalizedSavedText;

	const setField = (field: keyof NoteFormData, value: string) => {
		if (field === 'text') {
			onValueChange(value);
		}
	};

	const submit = (event: SubmitEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (isSubmitDisabled) {
			return;
		}

		const normalizedFormData = getNormalizedNoteFormData(formData);
		const result = validateNoteForm(normalizedFormData);

		if (!result.success) {
			setErrors(getNoteFormErrors(result));
			return;
		}

		onSubmit(result.output);
		onValueChange(result.output.text);
		setErrors({});
	};

	const reset = () => {
		onValueChange(savedValue);
		setErrors({});
	};

	return {
		formData,
		errors,
		isSubmitDisabled,
		isResetDisabled,
		setField,
		reset,
		submit,
	};
}
