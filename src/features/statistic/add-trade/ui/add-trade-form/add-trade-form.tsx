import {
	ActionIcon,
	Button,
	Group,
	Input,
	NumberInput,
	SegmentedControl,
	Select,
	Stack,
	Switch,
	Tooltip,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconHelpCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { TradeRequest } from '@/shared/api/types/gen/tradeRequest';
import type { TradeSignal } from '@/shared/api/types/gen/tradeSignal';

import { useCreateTrade } from '@/entities/statistic/api/gen';
import { useGetAllStocksCodes } from '@/entities/trade-code/api/gen';

type FormValues = {
	tradeTypeId: string;
	tradeCodeId: string;
	tradeSignal: string;
	count: number;
	tradeOpen: number;
	dateOpen: Date | null;
	isClosed: boolean;
	tradeClose?: number;
	dateClose?: Date | null;
};

export function AddTradeForm() {
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
			tradeSignal: '1',
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
			tradeSignal: Number(values.tradeSignal) as TradeSignal,
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
					modals.closeAll();
				},
			},
		);
	};

	const maxDate = dayjs().toDate();

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack>
				<SegmentedControl
					data={[
						{ label: 'Акция', value: '1' },
						{ label: 'Фьючерс', value: '2' },
					]}
					{...form.getInputProps('tradeTypeId')}
				/>

				<Input.Wrapper
					label={(
						<Group gap={4}>
							Направление сделки
							<Tooltip
								label='Long — покупка актива с расчетом на его рост. Short — продажа актива с расчетом на его падение.'
								multiline
								w={280}
								withArrow
								openDelay={150}
								events={{ hover: true, focus: true, touch: true }}
							>
								<ActionIcon
									size={18}
									aria-label='Что означает направление сделки'
									variant='transparent'
									c='dimmed'
								>
									<IconHelpCircle size={16} />
								</ActionIcon>
							</Tooltip>
						</Group>
					)}
				>
					<SegmentedControl
						data={[
							{ label: 'Long', value: '1' },
							{ label: 'Short', value: '-1' },
						]}
						fullWidth
						{...form.getInputProps('tradeSignal')}
					/>
				</Input.Wrapper>

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
