import { useMemo } from 'react';

import type { Stock, StockLinkedStrategy } from '@/entities/stock';

import { StockLinkedStrategiesModal } from '@/entities/stock';
import {
	getUserStrategyIdSet,
	useGetUsersStrategySuspense,
	useToggleUserStrategy,
} from '@/entities/strategy';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StockLinkedStrategiesModalContentSkeleton } from './stock-linked-strategies-modal-content.skeleton';
import { StockLinkedStrategyCard } from './stock-linked-strategy-card';

type StockLinkedStrategiesModalContentProps = {
	stock: Stock;
	modalId: string;
	onNavigate: (modalId: string) => void;
};

export function StockLinkedStrategiesModalContent({
	stock,
	modalId,
	onNavigate,
}: StockLinkedStrategiesModalContentProps) {
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

	function renderLinkedStrategy(strategy: StockLinkedStrategy) {
		return (
			<StockLinkedStrategyCard
				strategy={strategy}
				activeStrategyIds={activeStrategyIds}
				pendingStrategyId={pendingStrategyId}
				onStrategyActiveChange={handleStrategyActiveChange}
				onNavigate={() => {
					onNavigate(modalId);
				}}
			/>
		);
	}

	return (
		<StockLinkedStrategiesModal
			stock={stock}
			renderLinkedStrategy={renderLinkedStrategy}
		/>
	);
}

export const StockLinkedStrategiesModalContentBoundary = withQueryBoundary(
	StockLinkedStrategiesModalContent,
	{
		suspenseProps: {
			fallback: <StockLinkedStrategiesModalContentSkeleton />,
		},
	},
);
