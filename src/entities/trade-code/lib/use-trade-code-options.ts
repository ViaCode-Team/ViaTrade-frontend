import { useMemo } from 'react';

import { useGetStockCodes } from '../api/gen';

export function useTradeCodeOptions() {
	const { data: tradeCodesData, isLoading: isLoadingCodes } = useGetStockCodes();

	const selectOptions = useMemo(() => {
		const tradeCodes = tradeCodesData?.data.items ?? [];
		return tradeCodes.map((tc) => ({
			value: String(tc.id),
			label: `${tc.exchangeId} — ${tc.description || 'Нет описания'}`,
		}));
	}, [tradeCodesData?.data.items]);

	return {
		selectOptions,
		isLoadingCodes,
	};
}
