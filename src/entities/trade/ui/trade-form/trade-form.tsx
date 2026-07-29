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
import { IconHelpCircle } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useState } from 'react';

import { HELP_TOOLTIP_OPEN_DELAY } from '@/shared/model';

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
	entryPrice: number;
	openedAt: Date | null;
	isClosed: boolean;
	exitPrice?: number;
	closedAt?: Date | null;
};

export type TradeFormProps = {
	initialValues: TradeFormValues;
	onSubmit: (values: TradeFormValues) => void;
	submitText: string;
	isPending: boolean;
	instrumentsOptions: { value: string; label: string }[];
	isLoadingInstruments: boolean;
};

export function TradeForm({
	initialValues,
	onSubmit,
	submitText,
	isPending,
	instrumentsOptions,
	isLoadingInstruments,
}: TradeFormProps) {
	const form = useForm<TradeFormValues>({
		mode: 'uncontrolled',
		initialValues,
		validate: {
			tradeTypeId: (value) => (!value && 'Выберите тип сделки'),
			instrumentId: (value) => (!value && 'Выберите инструмент'),
			quantity: (value) => (value < 1 && 'Минимум 1'),
			entryPrice: (value) => (value < 0 && 'Цена должна быть больше 0'),
			openedAt: (value) => (!value && 'Выберите дату открытия'),
			exitPrice: (value, values) => (values.isClosed && value === undefined && 'Введите цену'),
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
						<Group gap={4}>
							Направление сделки
							<Tooltip
								label={TRADE_DIRECTION_HELP_TEXT}
								multiline
								w={280}
								withArrow
								openDelay={HELP_TOOLTIP_OPEN_DELAY}
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
						min={0}
						decimalScale={2}
						withAsterisk
						key={form.key('entryPrice')}
						{...form.getInputProps('entryPrice')}
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
