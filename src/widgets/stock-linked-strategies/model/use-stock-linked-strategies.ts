import { useMemo } from 'react';

import {
	getUserStrategyIdSet,
	mapTradeStrategiesToStrategies,
	useGetStrategiesSuspense,
	useGetUserStrategiesSuspense,
	useGetUserStrategyCodesSuspense,
} from '@/entities/strategy';

export const STOCK_LINKED_STRATEGIES_PAGE_SIZE = 12;

export function useStockLinkedStrategies(stockId: number, page: number, pageSize: number) {
	const { data: userStrategies } = useGetUserStrategiesSuspense({ page: 1, pageSize: 100 });
	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategies.data.items),
		[userStrategies.data.items],
	);

	const { data: instrumentsLinkResponse } = useGetUserStrategyCodesSuspense({ page: 1, pageSize: 100 });
	const { data: strategiesResponse } = useGetStrategiesSuspense({ page: 1, pageSize: 100 });

	// All linked strategies for this stock
	const allLinkedStrategies = useMemo(() => {
		const linkedStrategyIds = new Set(
			instrumentsLinkResponse.data.items
				.filter((link) => link.tradeCodeId === stockId)
				.map((link) => link.strategyId),
		);

		const tradeStrategies = strategiesResponse.data.items.filter((strategy) => linkedStrategyIds.has(strategy.id));
		return mapTradeStrategiesToStrategies(tradeStrategies, userStrategies.data.items);
	}, [instrumentsLinkResponse.data.items, strategiesResponse.data.items, userStrategies.data.items, stockId]);

	const totalPages = Math.max(1, Math.ceil(allLinkedStrategies.length / pageSize));
	const paginatedLinkedStrategies = allLinkedStrategies.slice((page - 1) * pageSize, page * pageSize);

	return {
		allLinkedStrategies: paginatedLinkedStrategies,
		activeStrategyIds,
		totalCount: allLinkedStrategies.length,
		totalPages,
	};
}
