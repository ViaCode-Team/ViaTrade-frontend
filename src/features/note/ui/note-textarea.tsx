import { Textarea } from '@mantine/core';

type NoteTextareaProps = {
	value: string;
	error?: string;
	placeholder?: string;
	minLength?: number;
	maxLength: number;
	minRows: number;
	maxRows: number;
	autoFocus?: boolean;
	onChange: (value: string) => void;
};

export function NoteTextarea({
	value,
	error,
	placeholder,
	minLength,
	maxLength,
	minRows,
	maxRows,
	autoFocus,
	onChange,
}: NoteTextareaProps) {
	return (
		<Textarea
			value={value}
			onChange={(event) => onChange(event.currentTarget.value)}
			error={error}
			placeholder={placeholder}
			size='md'
			autosize
			autoFocus={autoFocus}
			minLength={minLength}
			maxLength={maxLength}
			minRows={minRows}
			maxRows={maxRows}
		/>
	);
}
