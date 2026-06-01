import {
	Alert,
	Flex,
	Stack,
} from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';

import {
	NoteCharactersRemaining,
	type NoteFormData,
	NoteTextarea,
} from '@/entities/note';

import { useNoteForm } from '../lib/use-note-form';
import { NoteFormActions } from './note-form-actions';

type NoteFormProps = {
	value: string;
	savedValue: string;
	onValueChange: (value: string) => void;
	onSubmit: (formData: NoteFormData) => void;
	placeholder?: string;
	submitLabel?: string;
	resetLabel?: string;
	minLength?: number;
	maxLength?: number;
	minRows?: number;
	maxRows?: number;
	autoFocus?: boolean;
	isLoading?: boolean;
	isSubmitting?: boolean;
	errorMessage?: string;
};

export function NoteForm({
	value,
	savedValue,
	onValueChange,
	onSubmit,
	placeholder,
	submitLabel = 'Сохранить',
	resetLabel = 'Сбросить',
	minLength,
	maxLength = 1024,
	minRows = 4,
	maxRows = 12,
	autoFocus,
	isLoading,
	isSubmitting,
	errorMessage,
}: NoteFormProps) {
	const {
		form,
		isSubmitDisabled,
		isResetDisabled,
		handleSubmit,
		handleReset,
	} = useNoteForm({
		value,
		savedValue,
		onValueChange,
		onSubmit,
	});

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap='sm'>
				{errorMessage
					? (
							<Alert
								color='red'
								variant='outline'
								icon={<IconAlertTriangle size={18} />}
							>
								{errorMessage}
							</Alert>
						)
					: null}

				<NoteTextarea
					value={form.values.text}
					error={form.errors.text as string}
					onChange={(val: string) => {
						form.setFieldValue('text', val);
						onValueChange(val);
					}}
					placeholder={placeholder}
					minLength={minLength}
					maxLength={maxLength}
					minRows={minRows}
					maxRows={maxRows}
					autoFocus={autoFocus}
					disabled={isLoading || isSubmitting}
				/>

				<Flex justify='space-between' gap='sm' wrap='wrap'>
					<NoteCharactersRemaining
						valueLength={form.values.text.length}
						maxLength={maxLength}
					/>

					<NoteFormActions
						submitLabel={submitLabel}
						resetLabel={resetLabel}
						isSubmitDisabled={isSubmitDisabled}
						isResetDisabled={isResetDisabled}
						isSubmitting={isSubmitting}
						onReset={handleReset}
					/>
				</Flex>
			</Stack>
		</form>
	);
}
