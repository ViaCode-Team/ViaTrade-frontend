import { TextInput, type TextInputProps } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { type ChangeEvent, useState } from 'react';

import { milliseconds } from '@/shared/lib/milliseconds';

export type SearchInputProps = Omit<TextInputProps, 'onChange'> & {
	onChange?: (value: string) => void;
	debounceMs?: number;
};

export function SearchInput({
	onChange,
	debounceMs = milliseconds.fromMilliseconds(300),
	flex = 1,
	miw = 300,
	defaultValue = '',
	...props
}: SearchInputProps) {
	const [value, setValue] = useState(defaultValue);

	const debouncedSearch = useDebouncedCallback((val: string) => {
		onChange?.(val);
	}, debounceMs);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const val = event.currentTarget.value;

		setValue(val);
		debouncedSearch(val);
	};

	return (
		<TextInput
			{...props}
			flex={flex}
			miw={miw}
			value={value}
			onChange={handleChange}
			leftSection={<IconSearch size={16} />}
		/>
	);
}
