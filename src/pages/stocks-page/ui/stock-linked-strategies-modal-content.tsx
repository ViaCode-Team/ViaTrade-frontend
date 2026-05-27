import { useMemo } from 'react';

import type { Stock, StockLinkedStrategy } from '@/entities/stock';

import { StockLinkedStrategiesModal } from '@/entities/stock';
import {
	getUserStrategyIdSet,
	useGetUsersStrategySuspense,
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

	const activeStrategyIds = useMemo(
		() => getUserStrategyIdSet(userStrategies.data),
		[userStrategies.data],
	);
	function renderLinkedStrategy(strategy: StockLinkedStrategy) {
		return (
			<StockLinkedStrategyCard
				strategy={strategy}
				isActive={activeStrategyIds.has(strategy.id)}
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
