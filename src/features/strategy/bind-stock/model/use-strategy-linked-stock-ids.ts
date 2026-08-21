import { useSuspenseQuery } from '@tanstack/react-query';

import type { GetInstrumentsByStrategyParams } from '@/shared/api';

import {
	getGetInstrumentsByStrategyQueryKey,
	getInstrumentsByStrategy,
} from '@/entities/strategy';

const linkedStocksQueryParams = {
	page: 1,
	sortBy: ['symbolAsc'],
} satisfies GetInstrumentsByStrategyParams;

export function useStrategyLinkedStockIds(strategyId: number) {
	const { data } = useSuspenseQuery({
		queryKey: getGetInstrumentsByStrategyQueryKey(strategyId, linkedStocksQueryParams),
		queryFn: ({ signal }) => getAllStrategyLinkedStockIds(strategyId, signal),
	});

	return data;
}

async function getAllStrategyLinkedStockIds(strategyId: number, signal: AbortSignal) {
	const firstPage = await getInstrumentsByStrategy(
		strategyId,
		linkedStocksQueryParams,
		{ signal },
	);

	const remainingPageNumbers = Array.from(
		{ length: firstPage.data.totalPages - 1 },
		(_, index) => index + 2,
	);
	const remainingPages = await Promise.all(
		remainingPageNumbers.map((page) => getInstrumentsByStrategy(
			strategyId,
			{ ...linkedStocksQueryParams, page },
			{ signal },
		)),
	);

	return [firstPage, ...remainingPages]
		.flatMap((response) => response.data.items)
		.map((stock) => String(stock.id));
}
