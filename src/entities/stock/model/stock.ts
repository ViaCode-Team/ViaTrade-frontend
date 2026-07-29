import type { InstrumentResponse } from '@/shared/api';

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

export function mapInstrumentToStock(instrument: InstrumentResponse): Stock {
	return {
		id: instrument.id.toString(),
		instrumentId: instrument.id,
		ticker: instrument.symbol,
		name: instrument.description || instrument.symbol,
		linkedStrategies: [],
	};
}
