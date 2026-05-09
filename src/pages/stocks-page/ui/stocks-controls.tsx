import { TextInput } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';

import cls from '../stocks-page.module.css';

type StocksControlsProps = {
	searchQuery: string;
	onSearchQueryChange: (searchQuery: string) => void;
};

export function StocksControls({
	searchQuery,
	onSearchQueryChange,
}: StocksControlsProps) {
	return (
		<TextInput
			value={searchQuery}
			onChange={(event) => {
				onSearchQueryChange(event.currentTarget.value);
			}}
			placeholder='Найти по тикеру или названию'
			aria-label='Поиск акции'
			leftSection={<IconSearch size={16} />}
			className={cls.searchInput}
		/>
	);
}
