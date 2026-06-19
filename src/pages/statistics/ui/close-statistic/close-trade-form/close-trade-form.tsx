import { Button, NumberInput, Stack } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { Trade } from '@/shared/api';
import type { TradeRequest } from '@/shared/api';

import { useUpdateTrade } from '@/entities/statistic';

type FormValues = {
	tradeClose: number | '';
	dateClose: Date | null;
};

type CloseTradeFormProps = {
	trade: Trade;
};

export function CloseTradeForm({ trade }: CloseTradeFormProps) {
	const { mutate: updateTrade, isPending } = useUpdateTrade();
	const [initialDate] = useState(() => new Date());

	const form = useForm<FormValues>({
		mode: 'uncontrolled',
		initialValues: {
			tradeClose: '',
			dateClose: initialDate,
		},
		validate: {
			tradeClose: (value) => (value === '' || value < 0 ? 'Введите корректную цену закрытия' : null),
			dateClose: (value) => (!value ? 'Выберите дату закрытия' : null),
		},
	});

	const handleSubmit = (values: FormValues) => {
		if (values.tradeClose === '' || !values.dateClose)
			return;

		const request: TradeRequest = {
			tradeTypeId: trade.tradeTypeId,
			tradeCodeId: trade.tradeCodeId,
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
