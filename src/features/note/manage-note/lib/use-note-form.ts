import { useForm } from '@mantine/form';
import { useEffect } from 'react';

import {
	getNormalizedNoteFormData,
	getNoteFormErrors,
	type NoteFormData,
	validateNoteForm,
} from '@/entities/note';

type UseNoteFormOptions = {
	value: string;
	savedValue: string;
	onValueChange: (value: string) => void;
	onSubmit: (formData: NoteFormData) => void;
};

export function useNoteForm({
	value,
	savedValue,
	onValueChange,
	onSubmit,
}: UseNoteFormOptions) {
	const form = useForm<NoteFormData>({
		initialValues: {
			text: value,
		},
		validate: (values) => {
			const normalized = getNormalizedNoteFormData(values);
			const result = validateNoteForm(normalized);
			return getNoteFormErrors(result) as Record<string, string>;
		},
	});

	useEffect(() => {
		form.setValues({ text: value });
	}, [value, form.setValues, form]);

	const normalizedSavedText = getNormalizedNoteFormData({ text: savedValue }).text;
	const currentNormalizedText = getNormalizedNoteFormData({ text: form.values.text }).text;

	const isSubmitDisabled = currentNormalizedText.length === 0 || currentNormalizedText === normalizedSavedText;
	const isResetDisabled = currentNormalizedText === normalizedSavedText;

	const handleSubmit = (values: NoteFormData) => {
		if (isSubmitDisabled)
			return;

		const normalized = getNormalizedNoteFormData(values);
		onSubmit(normalized);
		onValueChange(normalized.text);
	};

	const handleReset = () => {
		form.setValues({ text: savedValue });
		onValueChange(savedValue);
		form.clearErrors();
	};

	return {
		form,
		isSubmitDisabled,
		isResetDisabled,
		handleSubmit,
		handleReset,
	};
}
