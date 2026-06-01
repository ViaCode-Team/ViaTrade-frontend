import { Loader, TextInput, type TextInputProps } from '@mantine/core';
import { useDebouncedCallback, useUncontrolled } from '@mantine/hooks';
import { IconSearch } from '@tabler/icons-react';

export type SearchInputProps = Omit<TextInputProps, 'onChange'> & {
	isLoading?: boolean;
	value?: string;
	onChange?: (value: string) => void;
};

export function SearchInput({
	flex = 1,
	miw = 300,
	isLoading,
	value,
	onChange,
	...props
}: SearchInputProps) {
	const debouncedOnChange = useDebouncedCallback((val: string) => {
		onChange?.(val);
	}, 300);

	const [_value, handleChange] = useUncontrolled({
		value,
		defaultValue: '',
		finalValue: '',
		onChange: debouncedOnChange,
	});

	const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleChange(event.currentTarget.value);
	};

	return (
		<TextInput
			flex={flex}
			miw={miw}
			value={_value}
			onChange={onInputChange}
			leftSection={isLoading ? <Loader size={16} /> : <IconSearch size={16} />}
			{...props}
		/>
	);
}
