import { StrategyStockBinding } from '@/features/strategy/bind-stock';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

function StrategyStockBindingModal({ strategyId }: { strategyId: number }) {
	return (
		<StrategyStockBinding
			strategyId={strategyId}
		/>
	);
}

export const StrategyStockBindingModalBoundary = withQueryBoundary(StrategyStockBindingModal);
