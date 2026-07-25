import { modals } from '@mantine/modals';
import { useState } from 'react';

import type { TradeFormValues } from '@/entities/trade';

import { mapTradeFormValuesToRequest, useCreateUserTrade } from '@/entities/trade';
import { TradeForm } from '@/entities/trade';
import { useTradeCodeOptions } from '@/entities/trade-code';

export function AddTradeForm() {
	const { mutate: createTrade, isPending } = useCreateUserTrade();
	const { selectOptions, isLoadingCodes } = useTradeCodeOptions();

	const [initialDate] = useState(() => new Date());

	const initialValues: TradeFormValues = {
		tradeTypeId: '1',
		tradeCodeId: '',
		tradeSignal: '1',
		count: 1,
		tradeOpen: 0,
		dateOpen: initialDate,
		isClosed: false,
		tradeClose: undefined,
		dateClose: undefined,
	};

	const handleSubmit = (values: TradeFormValues) => {
		const request = mapTradeFormValuesToRequest(values);
		if (!request)
			return;

		createTrade(
			{ data: request },
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
			submitText='Добавить сделку'
			isPending={isPending}
			tradeCodesOptions={selectOptions}
			isLoadingCodes={isLoadingCodes}
		/>
	);
}
