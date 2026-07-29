import dayjs from 'dayjs';

import type { CreateTradeRequest, TradeSignal } from '@/shared/api';

import type { TradeFormValues } from '../ui/trade-form/trade-form';

export function mapTradeFormValuesToRequest(values: TradeFormValues): CreateTradeRequest | null {
	if (!values.openedAt) {
		return null;
	}

	const request: CreateTradeRequest = {
		tradeTypeId: Number(values.tradeTypeId),
		instrumentId: Number(values.instrumentId),
		signal: Number(values.signal) as TradeSignal,
		quantity: values.quantity,
		entryPrice: values.entryPrice,
		openedAt: dayjs(values.openedAt).toISOString(),
	};

	if (values.isClosed && values.exitPrice !== undefined && values.closedAt) {
		request.exitPrice = values.exitPrice;
		request.closedAt = dayjs(values.closedAt).toISOString();
	}

	return request;
}
