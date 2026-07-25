import { Button, NumberInput, Stack } from '@mantine/core';
import '@mantine/dates/styles.css';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { TradeResponse } from '@/shared/api';
import type { TradeRequest } from '@/shared/api';

import { useUpdateUserTrade } from '@/entities/trade';

type FormValues = {
	tradeClose: number | '';
	dateClose: Date | null;
};

type CloseTradeFormProps = {
	trade: TradeResponse;
};

export function CloseTradeForm({ trade }: CloseTradeFormProps) {
	const { mutate: updateTrade, isPending } = useUpdateUserTrade();
	const [initialDate] = useState(() => new Date());

	const form = useForm<FormValues>({
		mode: 'uncontrolled',
		initialValues: {
			tradeClose: '',
			dateClose: initialDate,
		},
		validate: {
			tradeClose: (value) => ((value === '' || value < 0) && 'Введите корректную цену закрытия'),
			dateClose: (value) => (!value && 'Выберите дату закрытия'),
		},
	});

	const handleSubmit = (values: FormValues) => {
		if (values.tradeClose === '' || !values.dateClose || !trade.tradeCode)
			return;

		const request: TradeRequest = {
			tradeTypeId: trade.tradeTypeId,
			tradeCodeId: trade.tradeCode.id,
			tradeSignal: trade.tradeSignal ?? 0,
			count: trade.count,
			tradeOpen: trade.tradeOpen,
			dateOpen: trade.dateOpen,
			tradeClose: Number(values.tradeClose),
			dateClose: dayjs(values.dateClose).toISOString(),
		};

		updateTrade(
			{ id: trade.id, data: request },
			{
				onSuccess: () => {
					modals.closeAll();
				},
			},
		);
	};

	const [minDate] = useState(() => dayjs(trade.dateOpen).toDate());

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap='md'>
				<NumberInput
					label='Цена закрытия'
					placeholder='Цена, ₽'
					min={0}
					decimalScale={2}
					withAsterisk
					key={form.key('tradeClose')}
					{...form.getInputProps('tradeClose')}
				/>

				<DateTimePicker
					label='Дата закрытия'
					placeholder='Дата и время'
					withAsterisk
					minDate={minDate}
					maxDate={initialDate}
					key={form.key('dateClose')}
					{...form.getInputProps('dateClose')}
				/>

				<Button type='submit' loading={isPending} fullWidth mt='md'>
					Сохранить
				</Button>
			</Stack>
		</form>
	);
}
