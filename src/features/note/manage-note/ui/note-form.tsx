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
		formData,
		errors,
		isSubmitDisabled,
		isResetDisabled,
		setField,
		reset,
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
					value={formData.text}
					error={errors.text}
					placeholder={placeholder}
					minLength={minLength}
					maxLength={maxLength}
					minRows={minRows}
					maxRows={maxRows}
					autoFocus={autoFocus}
					disabled={isLoading || isSubmitting}
					onChange={(nextValue) => setField('text', nextValue)}
				/>

				<Flex justify='space-between' gap='sm' wrap='wrap'>
					<NoteCharactersRemaining
						valueLength={formData.text.length}
						maxLength={maxLength}
					/>

					<NoteFormActions
						submitLabel={submitLabel}
						resetLabel={resetLabel}
						isSubmitDisabled={isSubmitDisabled}
						isResetDisabled={isResetDisabled}
						isSubmitting={isSubmitting}
						onReset={reset}
					/>
				</Flex>
			</Stack>
		</form>
	);
}
