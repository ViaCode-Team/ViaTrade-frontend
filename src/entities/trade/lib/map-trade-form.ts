import dayjs from 'dayjs';

import type { TradeRequest, TradeSignal } from '@/shared/api';

import type { TradeFormValues } from '../ui/trade-form/trade-form';

export function mapTradeFormValuesToRequest(values: TradeFormValues): TradeRequest | null {
	if (!values.dateOpen) {
		return null;
	}

	const request: TradeRequest = {
		tradeTypeId: Number(values.tradeTypeId),
		tradeCodeId: Number(values.tradeCodeId),
		tradeSignal: Number(values.tradeSignal) as TradeSignal,
		count: values.count,
		tradeOpen: values.tradeOpen,
		dateOpen: dayjs(values.dateOpen).toISOString(),
	};

	if (values.isClosed && values.tradeClose !== undefined && values.dateClose) {
		request.tradeClose = values.tradeClose;
		request.dateClose = dayjs(values.dateClose).toISOString();
	}

	return request;
}
