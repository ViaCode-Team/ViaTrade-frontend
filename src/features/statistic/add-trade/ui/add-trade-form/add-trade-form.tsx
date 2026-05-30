import {
	Button,
	Group,
	NumberInput,
	SegmentedControl,
	Select,
	Stack,
	Switch,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { TradeRequest } from '@/shared/api/types/gen/tradeRequest';

import { getGetByUserQueryKey, useCreateTrade } from '@/entities/statistic/api/gen';
import { useGetAllStocksCodes } from '@/entities/trade-code/api/gen';

type FormValues = {
	tradeTypeId: string;
	tradeCodeId: string;
	count: number;
	tradeOpen: number;
	dateOpen: Date | null;
	isClosed: boolean;
	tradeClose?: number;
	dateClose?: Date | null;
};

export function AddTradeForm() {
	const queryClient = useQueryClient();
	const { mutate: createTrade, isPending } = useCreateTrade();
	const { data: tradeCodesData, isLoading: isLoadingCodes } = useGetAllStocksCodes();

	const tradeCodes = tradeCodesData?.data ?? [];
	const selectOptions = tradeCodes.map((tc) => ({
		value: String(tc.id),
		label: `${tc.exchangeId} — ${tc.description || 'Нет описания'}`,
	}));

	const [initialDate] = useState(() => new Date());

	const form = useForm<FormValues>({
		initialValues: {
			tradeTypeId: '1',
			tradeCodeId: '',
			count: 1,
			tradeOpen: 0,
			dateOpen: initialDate,
			isClosed: false,
			tradeClose: undefined,
			dateClose: undefined,
		},
		validate: {
			tradeTypeId: (value) => (!value ? 'Выберите тип сделки' : null),
			tradeCodeId: (value) => (!value ? 'Выберите инструмент' : null),
			count: (value) => (value < 1 ? 'Минимум 1' : null),
			tradeOpen: (value) => (value < 0 ? 'Цена должна быть больше 0' : null),
			dateOpen: (value) => (!value ? 'Выберите дату открытия' : null),
			tradeClose: (value, values) => (values.isClosed && value === undefined ? 'Введите цену' : null),
			dateClose: (value, values) => (values.isClosed && !value ? 'Выберите дату закрытия' : null),
		},
	});

	const handleSubmit = (values: FormValues) => {
		if (!values.dateOpen)
			return;

		const request: TradeRequest = {
			tradeTypeId: Number(values.tradeTypeId),
			tradeCodeId: Number(values.tradeCodeId),
			count: values.count,
			tradeOpen: values.tradeOpen,
			dateOpen: dayjs(values.dateOpen).toISOString(),
		};

		if (values.isClosed && values.tradeClose !== undefined && values.dateClose) {
			request.tradeClose = values.tradeClose;
			request.dateClose = dayjs(values.dateClose).toISOString();
		}

		createTrade(
			{ data: request },
			{
				onSuccess: () => {
					notifications.show({
						title: 'Успех',
						message: 'Сделка успешно добавлена',
						color: 'green',
					});
					queryClient.invalidateQueries({ queryKey: getGetByUserQueryKey() });
					modals.closeAll();
				},
				onError: () => {
					notifications.show({
						title: 'Ошибка',
						message: 'Не удалось добавить сделку',
						color: 'red',
					});
				},
			},
		);
	};

	const maxDate = dayjs().toDate();

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap='md'>
				<SegmentedControl
					data={[
						{ label: 'Long', value: '1' },
						{ label: 'Short', value: '2' },
					]}
					{...form.getInputProps('tradeTypeId')}
				/>

				<Select
					label='Инструмент'
					placeholder='Тикер'
					data={selectOptions}
					searchable
					disabled={isLoadingCodes}
					withAsterisk
					{...form.getInputProps('tradeCodeId')}
				/>

				<Group grow>
					<NumberInput
						label='Количество'
						placeholder='10'
						min={1}
						withAsterisk
						{...form.getInputProps('count')}
					/>
					<NumberInput
						label='Цена открытия'
						placeholder='Цена, ₽'
						min={0}
						decimalScale={2}
						withAsterisk
						{...form.getInputProps('tradeOpen')}
					/>
				</Group>

				<DateTimePicker
					label='Дата открытия'
					placeholder='Дата и время'
					withAsterisk
					maxDate={maxDate}
					{...form.getInputProps('dateOpen')}
				/>

				<Switch
					label='Сделка закрыта'
					{...form.getInputProps('isClosed', { type: 'checkbox' })}
				/>

				{form.values.isClosed && (
					<>
						<NumberInput
							label='Цена закрытия'
							placeholder='Цена, ₽'
							min={0}
							decimalScale={2}
							withAsterisk
							{...form.getInputProps('tradeClose')}
						/>
						<DateTimePicker
							label='Дата закрытия'
							placeholder='Дата и время'
							withAsterisk
							minDate={form.values.dateOpen || undefined}
							maxDate={maxDate}
							{...form.getInputProps('dateClose')}
						/>
					</>
				)}

				<Button type='submit' loading={isPending} fullWidth mt='md'>
					Добавить сделку
				</Button>
			</Stack>
		</form>
	);
}
