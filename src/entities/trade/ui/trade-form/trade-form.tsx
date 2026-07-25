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
	tradeCodeId: string;
	tradeSignal: string;
	count: number;
	tradeOpen: number;
	dateOpen: Date | null;
	isClosed: boolean;
	tradeClose?: number;
	dateClose?: Date | null;
};

export type TradeFormProps = {
	initialValues: TradeFormValues;
	onSubmit: (values: TradeFormValues) => void;
	submitText: string;
	isPending: boolean;
	tradeCodesOptions: { value: string; label: string }[];
	isLoadingCodes: boolean;
};

export function TradeForm({
	initialValues,
	onSubmit,
	submitText,
	isPending,
	tradeCodesOptions,
	isLoadingCodes,
}: TradeFormProps) {
	const form = useForm<TradeFormValues>({
		mode: 'uncontrolled',
		initialValues,
		validate: {
			tradeTypeId: (value) => (!value && 'Выберите тип сделки'),
			tradeCodeId: (value) => (!value && 'Выберите инструмент'),
			count: (value) => (value < 1 && 'Минимум 1'),
			tradeOpen: (value) => (value < 0 && 'Цена должна быть больше 0'),
			dateOpen: (value) => (!value && 'Выберите дату открытия'),
			tradeClose: (value, values) => (values.isClosed && value === undefined && 'Введите цену'),
			dateClose: (value, values) => (values.isClosed && !value && 'Выберите дату закрытия'),
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
						key={form.key('tradeSignal')}
						{...form.getInputProps('tradeSignal')}
					/>
				</Input.Wrapper>

				<Select
					label='Инструмент'
					placeholder='Тикер'
					data={tradeCodesOptions}
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
					{submitText}
				</Button>
			</Stack>
		</form>
	);
}
