import type { TradeCode } from '@/shared/api';

export type Stock = {
	id: string;
	instrumentId: number;
	ticker: string;
	name: string;
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
		linkedStrategies: [],
	};
}
