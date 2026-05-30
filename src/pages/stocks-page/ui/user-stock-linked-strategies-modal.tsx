import type { Stock } from '@/entities/trade-code/stock';

import { StockLinkedStrategies } from '@/widgets/stock-linked-strategies';

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
		<StockLinkedStrategies
			stockId={stock.instrumentId}
			onNavigate={() => onNavigate(modalId)}
		/>
	);
}
