import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { TradeFormValues } from '@/entities/trade';
import type { Trade } from '@/shared/api';

import { mapTradeFormValuesToRequest, useUpdateUserTrade } from '@/entities/trade';
import { TradeForm } from '@/entities/trade';
import { useTradeCodeOptions } from '@/entities/trade-code';

type EditTradeFormProps = {
	trade: Trade;
};

export function EditTradeForm({ trade }: EditTradeFormProps) {
	const { mutate: updateTrade, isPending } = useUpdateUserTrade();
	const { selectOptions, isLoadingCodes } = useTradeCodeOptions();

	const [initialDate] = useState(() => trade.dateOpen ? dayjs(trade.dateOpen).toDate() : new Date());

	const initialValues: TradeFormValues = {
		tradeTypeId: String(trade.tradeTypeId),
		tradeCodeId: String(trade.tradeCodeId),
		tradeSignal: String(trade.tradeSignal ?? 0),
		count: trade.count,
		tradeOpen: trade.tradeOpen,
		dateOpen: initialDate,
		isClosed: !!trade.dateClose,
		tradeClose: trade.tradeClose,
		dateClose: trade.dateClose ? dayjs(trade.dateClose).toDate() : undefined,
	};

	const handleSubmit = (values: TradeFormValues) => {
		const request = mapTradeFormValuesToRequest(values);
		if (!request)
			return;

		updateTrade(
			{ id: trade.id, data: request },
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
			tradeCodesOptions={selectOptions}
			isLoadingCodes={isLoadingCodes}
		/>
	);
}
