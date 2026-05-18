import { Text } from '@mantine/core';

type NoteCharactersRemainingProps = {
	valueLength: number;
	maxLength: number;
};

export function NoteCharactersRemaining({
	valueLength,
	maxLength,
}: NoteCharactersRemainingProps) {
	return (
		<Text size='sm' c='dimmed'>
			Символы:
			{' '}
			{valueLength}
			/
			{maxLength}
		</Text>
	);
}
