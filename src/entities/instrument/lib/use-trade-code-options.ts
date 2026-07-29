import { useMemo } from 'react';

import { useGetInstruments } from '../api/gen';

export function useInstrumentOptions() {
	const { data: instrumentsData, isLoading: isLoadingInstruments } = useGetInstruments({
		page: 1,
		pageSize: 100,
	});

	const selectOptions = useMemo(() => {
		const instruments = instrumentsData?.data.items ?? [];
		return instruments.map((tc) => ({
			value: String(tc.id),
			label: `${tc.symbol} — ${tc.description || 'Нет описания'}`,
		}));
	}, [instrumentsData?.data.items]);

	return {
		selectOptions,
		isLoadingInstruments,
	};
}
