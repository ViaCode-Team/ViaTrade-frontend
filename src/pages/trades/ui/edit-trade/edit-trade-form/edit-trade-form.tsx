import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { TradeFormValues } from '@/entities/trade';
import type { TradeResponse } from '@/shared/api';

import { useInstrumentOptions } from '@/entities/instrument';
import { mapTradeFormValuesToRequest, useUpdateTrade } from '@/entities/trade';
import { TradeForm } from '@/entities/trade';

type EditTradeFormProps = {
	trade: TradeResponse;
};

export function EditTradeForm({ trade }: EditTradeFormProps) {
	const { mutate: updateTrade, isPending } = useUpdateTrade();
	const { selectOptions, isLoadingInstruments } = useInstrumentOptions();

	const [initialDate] = useState(() => trade.openedAt ? dayjs(trade.openedAt).toDate() : new Date());

	const initialValues: TradeFormValues = {
		tradeTypeId: String(trade.tradeTypeId),
		instrumentId: String(trade.instrument?.id ?? ''),
		signal: String(trade.signal ?? 0),
		quantity: trade.quantity,
		entryPrice: trade.entryPrice,
		openedAt: initialDate,
		isClosed: !!trade.closedAt,
		exitPrice: trade.exitPrice,
		closedAt: trade.closedAt ? dayjs(trade.closedAt).toDate() : undefined,
	};

	const handleSubmit = (values: TradeFormValues) => {
		const request = mapTradeFormValuesToRequest(values);
		if (!request)
			return;

		updateTrade(
			{ tradeId: trade.id, data: request },
			{
				onSuccess: () => {
					modals.closeAll();
				},
			},
		);
	};

	return (
		<TradeForm
			initialValues={initialValues}
			onSubmit={handleSubmit}
			submitText='Сохранить изменения'
			isPending={isPending}
			instrumentsOptions={selectOptions}
			isLoadingInstruments={isLoadingInstruments}
		/>
	);
}
