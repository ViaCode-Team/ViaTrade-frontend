import { useMemo } from 'react';

import type { Stock, StockLinkedStrategy } from '@/entities/trade-code/stock';

import {
	getUserStrategyIdSet,
	useGetUsersStrategySuspense,
} from '@/entities/strategy';
import { StockLinkedStrategiesModal } from '@/entities/trade-code/stock';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StockLinkedStrategyCard } from './stock-linked-strategy-card';
import { UserStockLinkedStrategiesModalSkeleton } from './user-stock-linked-strategies-modal.skeleton';

type UserStockLinkedStrategiesModalProps = {
	stock: Stock;
	modalId: string;
	onNavigate: (modalId: string) => void;
};

export function UserStockLinkedStrategiesModal({
	stock,
	modalId,
	onNavigate,
}: UserStockLinkedStrategiesModalProps) {
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

export const UserStockLinkedStrategiesModalBoundary = withQueryBoundary(
	UserStockLinkedStrategiesModal,
	{
		suspenseProps: {
			fallback: <UserStockLinkedStrategiesModalSkeleton />,
		},
	},
);
