import { TextInput, type TextInputProps } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

export type SearchInputProps = TextInputProps;

export function SearchInput({
	flex = 1,
	miw = 300,
	...props
}: SearchInputProps) {
	return (
		<TextInput
			flex={flex}
			miw={miw}
			leftSection={<IconSearch size={16} />}
			{...props}
		/>
	);
}
