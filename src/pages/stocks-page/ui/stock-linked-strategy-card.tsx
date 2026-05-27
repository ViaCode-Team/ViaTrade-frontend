import type { StockLinkedStrategy } from '@/entities/stock';

import {
	StrategyCard,
	toStrategyCardStrategy,
} from '@/entities/strategy';
import { StrategyToggleCheckbox } from '@/features/strategy/toggle-strategy';

type StockLinkedStrategyCardProps = {
	strategy: StockLinkedStrategy;
	isActive: boolean;
	onNavigate?: () => void;
};

export function StockLinkedStrategyCard({
	strategy,
	isActive,
	onNavigate,
}: StockLinkedStrategyCardProps) {
	return (
		<StrategyCard
			strategy={toStrategyCardStrategy(
				strategy,
				isActive,
			)}
			onLinkClick={onNavigate}
			actionSlot={
				<StrategyToggleCheckbox strategyId={strategy.id} isActive={isActive} />
			}
		/>
	);
}
