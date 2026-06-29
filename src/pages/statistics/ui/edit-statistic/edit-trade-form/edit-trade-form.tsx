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
import '@mantine/dates/styles.css';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { IconHelpCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

import type { Trade } from '@/shared/api';
import type { TradeRequest } from '@/shared/api';
import type { TradeSignal } from '@/shared/api';

import { useUpdateTrade } from '@/entities/statistic';
import { useGetAllStocksCodes } from '@/entities/trade-code';

type EditTradeFormProps = {
	trade: Trade;
};

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

export function EditTradeForm({ trade }: EditTradeFormProps) {
	const { mutate: updateTrade, isPending } = useUpdateTrade();
	const { data: tradeCodesData, isLoading: isLoadingCodes } = useGetAllStocksCodes();

	const tradeCodes = tradeCodesData?.data ?? [];
	const selectOptions = tradeCodes.map((tc) => ({
		value: String(tc.id),
		label: `${tc.exchangeId} — ${tc.description || 'Нет описания'}`,
	}));

	const [initialDate] = useState(() => trade.dateOpen ? dayjs(trade.dateOpen).toDate() : new Date());

	const form = useForm<FormValues>({
		mode: 'uncontrolled',
		initialValues: {
			tradeTypeId: String(trade.tradeTypeId),
			tradeCodeId: String(trade.tradeCodeId),
			tradeSignal: String(trade.tradeSignal ?? 0),
			count: trade.count,
			tradeOpen: trade.tradeOpen,
			dateOpen: initialDate,
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

	const [isClosed, setIsClosed] = useState(!!trade.dateClose);

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

		updateTrade(
			{ id: trade.id, data: request },
			{
				onSuccess: () => {
					modals.closeAll();
				},
			},
		);
	};

	const maxDate = dayjs().toDate();
	const { onChange: isClosedOnChange, ...isClosedProps } = form.getInputProps('isClosed', { type: 'checkbox' });

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack>
				<SegmentedControl
					data={[
						{ label: 'Акция', value: '1' },
						{ label: 'Фьючерс', value: '2' },
					]}
					key={form.key('tradeTypeId')}
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
						key={form.key('tradeSignal')}
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
					key={form.key('tradeCodeId')}
					{...form.getInputProps('tradeCodeId')}
				/>

				<Group grow>
					<NumberInput
						label='Количество'
						placeholder='10'
						min={1}
						withAsterisk
						key={form.key('count')}
						{...form.getInputProps('count')}
					/>
					<NumberInput
						label='Цена открытия'
						placeholder='Цена, ₽'
						min={0}
						decimalScale={2}
						withAsterisk
						key={form.key('tradeOpen')}
						{...form.getInputProps('tradeOpen')}
					/>
				</Group>

				<DateTimePicker
					label='Дата открытия'
					placeholder='Дата и время'
					withAsterisk
					maxDate={maxDate}
					key={form.key('dateOpen')}
					{...form.getInputProps('dateOpen')}
				/>

				<Switch
					label='Сделка закрыта'
					key={form.key('isClosed')}
					{...isClosedProps}
					onChange={(e) => {
						isClosedOnChange?.(e);
						setIsClosed(e.currentTarget.checked);
					}}
				/>

				{isClosed && (
					<>
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
							minDate={form.getValues().dateOpen || undefined}
							maxDate={maxDate}
							key={form.key('dateClose')}
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
