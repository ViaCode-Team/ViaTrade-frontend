import type { StockLinkedStrategy } from '@/entities/stock';

import {
	StrategyCard,
	toStrategyCardStrategy,
} from '@/entities/strategy';

type StockLinkedStrategyCardProps = {
	strategy: StockLinkedStrategy;
	activeStrategyIds: Set<number>;
	pendingStrategyId?: number;
	onStrategyActiveChange: (strategyId: number, isActive: boolean) => void;
	onNavigate?: () => void;
};

export function StockLinkedStrategyCard({
	strategy,
	activeStrategyIds,
	pendingStrategyId,
	onStrategyActiveChange,
	onNavigate,
}: StockLinkedStrategyCardProps) {
	return (
		<StrategyCard
			strategy={toStrategyCardStrategy(
				strategy,
				activeStrategyIds.has(strategy.id),
			)}
			onLinkClick={onNavigate}
			activation={{
				isActiveChangePending: pendingStrategyId === strategy.id,
				onActiveChange: onStrategyActiveChange,
			}}
		/>
	);
}
