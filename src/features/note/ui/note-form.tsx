import {
	Button,
	Group,
	Stack,
	Textarea,
} from '@mantine/core';

import { brandGradient } from '@/shared/model/theme';

import type { NoteFormData } from '../model';

import { useNoteForm } from '../lib/use-note-form';

type NoteFormProps = {
	value: string;
	savedValue: string;
	onValueChange: (value: string) => void;
	onSubmit: (formData: NoteFormData) => void;
	placeholder?: string;
	submitLabel?: string;
	minLength?: number;
	maxLength?: number;
	minRows?: number;
	maxRows?: number;
};

export function NoteForm({
	value,
	savedValue,
	onValueChange,
	onSubmit,
	placeholder,
	submitLabel = 'Сохранить заметку',
	minLength,
	maxLength = 4000,
	minRows = 4,
	maxRows = 12,
}: NoteFormProps) {
	const {
		formData,
		errors,
		isSubmitDisabled,
		setField,
		submit,
	} = useNoteForm({
		value,
		savedValue,
		onValueChange,
		onSubmit,
	});

	return (
		<form onSubmit={submit}>
			<Stack>
				<Textarea
					value={formData.text}
					onChange={(event) => setField('text', event.currentTarget.value)}
					error={errors.text}
					placeholder={placeholder}
					size='lg'
					autosize
					minLength={minLength}
					maxLength={maxLength}
					minRows={minRows}
					maxRows={maxRows}
				/>

				<Group justify='flex-end'>
					<Button
						variant='gradient'
						gradient={brandGradient}
						size='md'
						type='submit'
						disabled={isSubmitDisabled}
					>
						{submitLabel}
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
