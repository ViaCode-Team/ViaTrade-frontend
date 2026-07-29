import { modals } from '@mantine/modals';
import { useState } from 'react';

import type { TradeFormValues } from '@/entities/trade';

import { useInstrumentOptions } from '@/entities/instrument';
import { mapTradeFormValuesToRequest, useCreateTrade } from '@/entities/trade';
import { TradeForm } from '@/entities/trade';

export function AddTradeForm() {
	const { mutate: createTrade, isPending } = useCreateTrade();
	const { selectOptions, isLoadingInstruments } = useInstrumentOptions();

	const [initialDate] = useState(() => new Date());

	const initialValues: TradeFormValues = {
		tradeTypeId: '1',
		instrumentId: '',
		signal: '1',
		quantity: 1,
		entryPrice: 0,
		openedAt: initialDate,
		isClosed: false,
		exitPrice: undefined,
		closedAt: undefined,
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
			instrumentsOptions={selectOptions}
			isLoadingInstruments={isLoadingInstruments}
		/>
	);
}
