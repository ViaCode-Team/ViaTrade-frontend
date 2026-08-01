import { TextInput, type TextInputProps } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { type ChangeEvent, useRef, useState } from 'react';

import { milliseconds } from '@/shared/lib/milliseconds';

export type SearchInputProps = Omit<TextInputProps, 'onChange'> & {
	onChange?: (value: string) => void;
	debounceMs?: number;
};

export function SearchInput({
	value: externalValue,
	onChange,
	debounceMs = milliseconds.fromMilliseconds(300),
	flex = 1,
	miw = 300,
	defaultValue = '',
	...props
}: SearchInputProps) {
	const externalValueString = String(externalValue ?? defaultValue);
	const [value, setValue] = useState(externalValueString);
	const [previousExternalValue, setPreviousExternalValue] = useState(externalValueString);
	const lastEmittedValueRef = useRef<string | undefined>(undefined);

	if (externalValueString !== previousExternalValue) {
		setPreviousExternalValue(externalValueString);

		if (externalValueString !== lastEmittedValueRef.current)
			setValue(externalValueString);
	}

	const debouncedSearch = useDebouncedCallback((val: string) => {
		lastEmittedValueRef.current = val;
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
