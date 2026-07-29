import { Button, NumberInput, Stack } from '@mantine/core';
import '@mantine/dates/styles.css';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { TradeResponse } from '@/shared/api';
import type { UpdateTradeRequest } from '@/shared/api';

import { useUpdateTrade } from '@/entities/trade';

type FormValues = {
	exitPrice: number | '';
	closedAt: Date | null;
};

type CloseTradeFormProps = {
	trade: TradeResponse;
};

export function CloseTradeForm({ trade }: CloseTradeFormProps) {
	const { mutate: updateTrade, isPending } = useUpdateTrade();
	const [initialDate] = useState(() => new Date());

	const form = useForm<FormValues>({
		mode: 'uncontrolled',
		initialValues: {
			exitPrice: '',
			closedAt: initialDate,
		},
		validate: {
			exitPrice: (value) => ((value === '' || value < 0) && 'Введите корректную цену закрытия'),
			closedAt: (value) => (!value && 'Выберите дату закрытия'),
		},
	});

	const handleSubmit = (values: FormValues) => {
		if (values.exitPrice === '' || !values.closedAt || !trade.instrument)
			return;

		const request: UpdateTradeRequest = {
			tradeTypeId: trade.tradeTypeId,
			instrumentId: trade.instrument.id,
			signal: trade.signal ?? 0,
			quantity: trade.quantity,
			entryPrice: trade.entryPrice,
			openedAt: trade.openedAt,
			exitPrice: Number(values.exitPrice),
			closedAt: dayjs(values.closedAt).toISOString(),
		};

		updateTrade(
			{ tradeId: trade.id, data: request },
			{
				onSuccess: () => {
					modals.closeAll();
				},
			},
		);
	};

	const [minDate] = useState(() => dayjs(trade.openedAt).toDate());

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap='md'>
				<NumberInput
					label='Цена закрытия'
					placeholder='Цена, ₽'
					min={0}
					decimalScale={2}
					withAsterisk
					key={form.key('exitPrice')}
					{...form.getInputProps('exitPrice')}
				/>

				<DateTimePicker
					label='Дата закрытия'
					placeholder='Дата и время'
					withAsterisk
					minDate={minDate}
					maxDate={initialDate}
					key={form.key('closedAt')}
					{...form.getInputProps('closedAt')}
				/>

				<Button type='submit' loading={isPending} fullWidth mt='md'>
					Сохранить
				</Button>
			</Stack>
		</form>
	);
}
