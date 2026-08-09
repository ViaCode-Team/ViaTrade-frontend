import dayjs from 'dayjs';

import type { CreateTradeRequest, TradeSignal } from '@/shared/api';

import type { TradeFormValues } from '../ui/trade-form/trade-form';

export function mapTradeFormValuesToRequest(values: TradeFormValues): CreateTradeRequest | null {
	if (!values.openedAt || !isPositiveNumber(values.openPrice)) {
		return null;
	}

	const request: CreateTradeRequest = {
		tradeTypeId: Number(values.tradeTypeId),
		instrumentId: Number(values.instrumentId),
		signal: Number(values.signal) as TradeSignal,
		quantity: values.quantity,
		openPrice: values.openPrice,
		openedAt: dayjs(values.openedAt).toISOString(),
	};

	if (values.isClosed) {
		const closePrice = values.closePrice;

		if (!isPositiveNumber(closePrice) || !values.closedAt) {
			return null;
		}

		request.closePrice = closePrice;
		request.closedAt = dayjs(values.closedAt).toISOString();
	}

	return request;
}

function isPositiveNumber(value: number | '' | undefined): value is number {
	return typeof value === 'number' && Number.isFinite(value) && value > 0;
}
