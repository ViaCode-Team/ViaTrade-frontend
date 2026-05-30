import { useMemo } from 'react';

import {
	getUserStrategyIdSet,
	mapTradeStrategiesToStrategies,
	useGetAllSuspense,
	useGetUsersStrategySuspense,
} from '@/entities/strategy';
import { useGetAllInstrumentsLinkSuspense } from '@/entities/strategy/api/gen';

export function useStockLinkedStrategies(stockId: number) {
	const { data: userStrategies } = useGetUsersStrategySuspense();
	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategies.data),
		[userStrategies.data],
	);

	const { data: instrumentsLinkResponse } = useGetAllInstrumentsLinkSuspense();
	const { data: strategiesResponse } = useGetAllSuspense();

	// All linked strategies for this stock
	const allLinkedStrategies = useMemo(() => {
		const linkedStrategyIds = new Set(
			instrumentsLinkResponse.data
				.filter((link) => link.tradeCodeId === stockId)
				.map((link) => link.strategyId),
		);

		const tradeStrategies = strategiesResponse.data.filter((strategy) => linkedStrategyIds.has(strategy.id));
		return mapTradeStrategiesToStrategies(tradeStrategies, userStrategies.data);
	}, [instrumentsLinkResponse.data, strategiesResponse.data, userStrategies.data, stockId]);

	return {
		allLinkedStrategies,
		activeStrategyIds,
	};
}
