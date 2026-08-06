import type { Stock } from '@/entities/stock';

import { StockLinkedStrategies } from '@/widgets/stock-linked-strategies';

type UserStockLinkedStrategiesModalProps = {
	stock: Stock;
	onNavigate: () => void;
};

export function UserStockLinkedStrategiesModal({
	stock,
	onNavigate,
}: UserStockLinkedStrategiesModalProps) {
	return (
		<StockLinkedStrategies
			stockId={stock.instrumentId}
			onNavigate={onNavigate}
		/>
	);
}
