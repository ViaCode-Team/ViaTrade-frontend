import { Loader, Select } from '@mantine/core';

import { useRemindInstrumentOptions } from '../lib/use-remind-instrument-options';

type RemindInstrumentSelectProps = {
	value: number | null;
	onChange: (value: number | null) => void;
};

export function RemindInstrumentSelect({
	value,
	onChange,
}: RemindInstrumentSelectProps) {
	const { options, isLoadingNextPage, loadNextPage } = useRemindInstrumentOptions();

	return (
		<Select
			label='Акция'
			placeholder='Выберите акцию'
			data={options}
			value={value?.toString() ?? null}
			onChange={(nextValue) => onChange(nextValue ? Number(nextValue) : null)}
			searchable
			nothingFoundMessage='Акции не найдены'
			withAsterisk
			scrollAreaProps={{ onBottomReached: loadNextPage }}
			rightSection={isLoadingNextPage ? <Loader size='xs' /> : undefined}
		/>
	);
}
