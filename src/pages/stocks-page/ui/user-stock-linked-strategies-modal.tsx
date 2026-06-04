import type { Stock } from '@/entities/trade-code/stock';

import { StockLinkedStrategiesWidget } from '@/widgets/stock-linked-strategies-widget';

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
		<StockLinkedStrategiesWidget
			stockId={stock.instrumentId}
			onNavigate={() => onNavigate(modalId)}
		/>
	);
}
