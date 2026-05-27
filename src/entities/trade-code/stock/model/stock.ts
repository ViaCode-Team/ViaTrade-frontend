import type { TradeCode } from '@/shared/api/types/gen';

export type Stock = {
	id: string;
	instrumentId: number;
	ticker: string;
	name: string;
	price: number;
	dayChangePercent: number;
	linkedStrategies: StockLinkedStrategy[];
};

export type StockLinkedStrategy = {
	id: number;
	name: string;
	description: string;
	accuracy: number;
	signalFrequency: string;
	investmentHorizon: string;
	isActive: boolean;
};

export function mapTradeCodeToStock(tradeCode: TradeCode): Stock {
	return {
		id: tradeCode.id.toString(),
		instrumentId: tradeCode.id,
		ticker: tradeCode.exchangeId,
		name: tradeCode.description || tradeCode.exchangeId,
		price: 0, // Mocked until API supports
		dayChangePercent: 0, // Mocked until API supports
		linkedStrategies: [], // Mocked until API supports
	};
}

export function getStockChangeColor(dayChangePercent: number) {
	if (dayChangePercent > 0) {
		return 'green';
	}

	if (dayChangePercent < 0) {
		return 'red';
	}

	return 'gray';
}
