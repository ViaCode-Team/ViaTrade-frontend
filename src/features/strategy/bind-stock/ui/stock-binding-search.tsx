import { ControlsGroup } from '@/shared/ui/filters-group';
import { SearchInput } from '@/shared/ui/search-input';

type StockBindingSearchProps = {
	value: string;
	placeholder: string;
	onChange: (query: string) => void;
};

export function StockBindingSearch({
	value,
	placeholder,
	onChange,
}: StockBindingSearchProps) {
	return (
		<ControlsGroup>
			<SearchInput
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				aria-label='Поиск акции'
			/>
		</ControlsGroup>
	);
}
