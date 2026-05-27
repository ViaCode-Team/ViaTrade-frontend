import { SearchInput } from '@/shared/ui/search-input';

type StocksControlsProps = {
	searchQuery: string;
	disabled?: boolean;
	onSearchQueryChange: (searchQuery: string) => void;
};

export function StocksControls({
	searchQuery,
	disabled,
	onSearchQueryChange,
}: StocksControlsProps) {
	return (
		<SearchInput
			value={searchQuery}
			onChange={(event) => {
				onSearchQueryChange(event.currentTarget.value);
			}}
			placeholder='Найти по тикеру или названию'
			aria-label='Поиск акции'
			disabled={disabled}
		/>
	);
}
