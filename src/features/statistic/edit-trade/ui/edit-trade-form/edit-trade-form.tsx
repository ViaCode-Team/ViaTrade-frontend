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

import type { Trade } from '@/shared/api/types/gen/trade';
import type { TradeRequest } from '@/shared/api/types/gen/tradeRequest';

import { getGetByUserQueryKey, useUpdateTrade } from '@/entities/statistic/api/gen';
import { useGetAllStocksCodes } from '@/entities/trade-code/api/gen';

type EditTradeFormProps = {
	trade: Trade;
};

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

export function EditTradeForm({ trade }: EditTradeFormProps) {
	const queryClient = useQueryClient();
	const { mutate: updateTrade, isPending } = useUpdateTrade();
	const { data: tradeCodesData, isLoading: isLoadingCodes } = useGetAllStocksCodes();

	const tradeCodes = tradeCodesData?.data ?? [];
	const selectOptions = tradeCodes.map((tc) => ({
		value: String(tc.id),
		label: `${tc.exchangeId} — ${tc.description || 'Нет описания'}`,
	}));

	const form = useForm<FormValues>({
		initialValues: {
			tradeTypeId: String(trade.tradeTypeId),
			tradeCodeId: String(trade.tradeCodeId),
			count: trade.count,
			tradeOpen: trade.tradeOpen,
			dateOpen: trade.dateOpen ? dayjs(trade.dateOpen).toDate() : new Date(),
			isClosed: !!trade.dateClose,
			tradeClose: trade.tradeClose,
			dateClose: trade.dateClose ? dayjs(trade.dateClose).toDate() : undefined,
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

		updateTrade(
			{ id: trade.id, data: request },
			{
				onSuccess: () => {
					notifications.show({
						title: 'Успех',
						message: 'Сделка успешно изменена',
						color: 'green',
					});
					queryClient.invalidateQueries({ queryKey: getGetByUserQueryKey() });
					modals.closeAll();
				},
				onError: () => {
					notifications.show({
						title: 'Ошибка',
						message: 'Не удалось изменить сделку',
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
					placeholder='Выберите тикер'
					data={selectOptions}
					searchable
					disabled={isLoadingCodes}
					withAsterisk
					{...form.getInputProps('tradeCodeId')}
				/>

				<Group grow>
					<NumberInput
						label='Количество'
						placeholder='Например, 10'
						min={1}
						withAsterisk
						{...form.getInputProps('count')}
					/>
					<NumberInput
						label='Цена открытия'
						placeholder='Цена в ₽'
						min={0}
						decimalScale={2}
						withAsterisk
						{...form.getInputProps('tradeOpen')}
					/>
				</Group>

				<DateTimePicker
					label='Дата открытия'
					placeholder='Выберите дату и время'
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
							placeholder='Цена в ₽'
							min={0}
							decimalScale={2}
							withAsterisk
							{...form.getInputProps('tradeClose')}
						/>
						<DateTimePicker
							label='Дата закрытия'
							placeholder='Выберите дату и время'
							withAsterisk
							minDate={form.values.dateOpen || undefined}
							maxDate={maxDate}
							{...form.getInputProps('dateClose')}
						/>
					</>
				)}

				<Button type='submit' loading={isPending} fullWidth mt='md'>
					Сохранить изменения
				</Button>
			</Stack>
		</form>
	);
}
