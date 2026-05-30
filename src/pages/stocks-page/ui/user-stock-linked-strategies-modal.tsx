import type { Stock } from '@/entities/trade-code/stock';

import { StockLinkedStrategiesWidgetBoundary } from '@/widgets/stock-linked-strategies';

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
	return (
		<StockLinkedStrategiesWidgetBoundary
			stockId={stock.instrumentId}
			onNavigate={() => onNavigate(modalId)}
		/>
	);
}

export const UserStockLinkedStrategiesModalBoundary = UserStockLinkedStrategiesModal;
