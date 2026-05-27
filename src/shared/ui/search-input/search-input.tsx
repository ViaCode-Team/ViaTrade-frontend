import { Loader, TextInput, type TextInputProps } from '@mantine/core';
import { useDebouncedCallback } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';
import { useState } from 'react';

export type SearchInputProps = Omit<TextInputProps, 'onChange'> & {
	isLoading?: boolean;
	value?: string;
	onChange?: (value: string) => void;
};

export function SearchInput({
	flex = 1,
	miw = 300,
	isLoading,
	value = '',
	onChange,
	...props
}: SearchInputProps) {
	const [localValue, setLocalValue] = useState(value);
	const [lastPropValue, setLastPropValue] = useState(value);

	if (value !== lastPropValue) {
		setLastPropValue(value);
		setLocalValue(value);
	}

	const debouncedOnChange = useDebouncedCallback((val: string) => {
		onChange?.(val);
	}, 300);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const val = event.currentTarget.value;
		setLocalValue(val);
		debouncedOnChange(val);
	};

	return (
		<TextInput
			flex={flex}
			miw={miw}
			value={localValue}
			onChange={handleChange}
			leftSection={isLoading ? <Loader size={16} /> : <IconSearch size={16} />}
			{...props}
		/>
	);
}
