import {
	Button,
	Flex,
	Stack,
	Text,
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
	submitLabel = 'Сохранить',
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
			<Stack gap='sm'>
				<Textarea
					value={formData.text}
					onChange={(event) => setField('text', event.currentTarget.value)}
					error={errors.text}
					placeholder={placeholder}
					size='md'
					autosize
					minLength={minLength}
					maxLength={maxLength}
					minRows={minRows}
					maxRows={maxRows}
				/>

				<Flex justify='space-between'>
					<Text size='sm' c='dimmed'>
						Символов:
						{' '}
						{formData.text.length}
						/
						{maxLength}
					</Text>

					<Button
						variant='gradient'
						gradient={brandGradient}
						size='sm'
						type='submit'
						disabled={isSubmitDisabled}
					>
						{submitLabel}
					</Button>
				</Flex>
			</Stack>
		</form>
	);
}
