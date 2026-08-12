import {
	Button,
	Group,
	Input,
	NumberInput,
	SegmentedControl,
	Select,
	Stack,
	Switch,
} from '@mantine/core';
import '@mantine/dates/styles.css';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useState } from 'react';

import { InfoLabel } from '@/shared/ui/info-label';

import {
	TRADE_DIRECTION_HELP_TEXT,
	TRADE_INSTRUMENT_TYPE_OPTIONS,
	TRADE_SIGNAL_OPTIONS,
} from '../../model/trade-form';

export type TradeFormValues = {
	tradeTypeId: string;
	instrumentId: string;
	signal: string;
	quantity: number;
	openPrice: number | '';
	openedAt: Date | null;
	isClosed: boolean;
	closePrice?: number | '';
	closedAt?: Date | null;
};

export type TradeFormProps = {
	initialValues: TradeFormValues;
	onSubmit: (values: TradeFormValues) => void;
	submitText: string;
	isPending: boolean;
	instrumentsOptions: { value: string; label: string }[];
	isLoadingInstruments: boolean;
	isLoadingMoreInstruments?: boolean;
	hasMoreInstruments?: boolean;
	onLoadMoreInstruments?: () => void;
};

export function TradeForm({
	initialValues,
	onSubmit,
	submitText,
	isPending,
	instrumentsOptions,
	isLoadingInstruments,
	isLoadingMoreInstruments,
	hasMoreInstruments,
	onLoadMoreInstruments,
}: TradeFormProps) {
	const form = useForm<TradeFormValues>({
		mode: 'uncontrolled',
		initialValues,
		validate: {
			tradeTypeId: (value) => (!value && 'Выберите тип сделки'),
			instrumentId: (value) => (!value && 'Выберите инструмент'),
			quantity: (value) => (value < 1 && 'Минимум 1'),
			openPrice: (value) => ((value === '' || value <= 0) && 'Цена должна быть больше 0'),
			openedAt: (value) => (!value && 'Выберите дату открытия'),
			closePrice: (value, values) => (
				values.isClosed
				&& (value === undefined || value === '' || value <= 0)
				&& 'Введите цену больше 0'
			),
			closedAt: (value, values) => (values.isClosed && !value && 'Выберите дату закрытия'),
		},
	});

	const [isClosed, setIsClosed] = useState(initialValues.isClosed);

	const maxDate = dayjs().toDate();
	const { onChange: isClosedOnChange, ...isClosedProps } = form.getInputProps('isClosed', { type: 'checkbox' });

	return (
		<form onSubmit={form.onSubmit(onSubmit)}>
			<Stack>
				<SegmentedControl
					data={[...TRADE_INSTRUMENT_TYPE_OPTIONS]}
					key={form.key('tradeTypeId')}
					{...form.getInputProps('tradeTypeId')}
				/>

				<Input.Wrapper
					label={(
						<InfoLabel
							label='Направление сделки'
							tooltipProps={{
								text: TRADE_DIRECTION_HELP_TEXT,
								ariaLabel: 'Что означает направление сделки',
							}}
						/>
					)}
				>
					<SegmentedControl
						data={[...TRADE_SIGNAL_OPTIONS]}
						fullWidth
						key={form.key('signal')}
						{...form.getInputProps('signal')}
					/>
				</Input.Wrapper>

				<Select
					label='Инструмент'
					placeholder='Тикер'
					data={instrumentsOptions}
					searchable
					disabled={isLoadingInstruments}
					nothingFoundMessage='Инструменты не найдены'
					scrollAreaProps={{
						onBottomReached: () => {
							if (hasMoreInstruments && !isLoadingMoreInstruments) {
								onLoadMoreInstruments?.();
							}
						},
					}}
					withAsterisk
					key={form.key('instrumentId')}
					{...form.getInputProps('instrumentId')}
				/>

				<Group grow>
					<NumberInput
						label='Количество'
						placeholder='10'
						min={1}
						withAsterisk
						key={form.key('quantity')}
						{...form.getInputProps('quantity')}
					/>
					<NumberInput
						label='Цена открытия'
						placeholder='Цена, ₽'
						min={0.01}
						decimalScale={2}
						withAsterisk
						key={form.key('openPrice')}
						{...form.getInputProps('openPrice')}
					/>
				</Group>

				<DateTimePicker
					label='Дата открытия'
					placeholder='Дата и время'
					withAsterisk
					maxDate={maxDate}
					key={form.key('openedAt')}
					{...form.getInputProps('openedAt')}
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
							min={0.01}
							decimalScale={2}
							withAsterisk
							key={form.key('closePrice')}
							{...form.getInputProps('closePrice')}
						/>
						<DateTimePicker
							label='Дата закрытия'
							placeholder='Дата и время'
							withAsterisk
							minDate={form.getValues().openedAt || undefined}
							maxDate={maxDate}
							key={form.key('closedAt')}
							{...form.getInputProps('closedAt')}
						/>
					</>
				)}

				<Button type='submit' loading={isPending} fullWidth mt='md'>
					{submitText}
				</Button>
			</Stack>
		</form>
	);
}
