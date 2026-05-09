import { useMemo } from 'react';

import type { StockLinkedStrategy } from '@/entities/stock';

import {
	getUserStrategyIdSet,
	StrategyCard,
	toStrategyCardStrategy,
	useGetUsersStrategySuspense,
	useToggleUserStrategy,
} from '@/entities/strategy';

type StockLinkedStrategyCardProps = {
	strategy: StockLinkedStrategy;
	onNavigate?: () => void;
};

export function StockLinkedStrategyCard({
	strategy,
	onNavigate,
}: StockLinkedStrategyCardProps) {
	const { data: userStrategies } = useGetUsersStrategySuspense();
	const strategyToggle = useToggleUserStrategy();
	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategies.data),
		[userStrategies.data],
	);
	const pendingStrategyId = strategyToggle.isPending
		? strategyToggle.variables?.strategyId
		: undefined;

	function handleStrategyActiveChange(strategyId: number, isActive: boolean) {
		strategyToggle.mutate({ strategyId, isActive });
	}

	return (
		<StrategyCard
			strategy={toStrategyCardStrategy(
				strategy,
				activeStrategyIds.has(strategy.id),
			)}
			onLinkClick={onNavigate}
			activation={{
				isActiveChangePending: pendingStrategyId === strategy.id,
				onActiveChange: handleStrategyActiveChange,
			}}
		/>
	);
}
