import {
	Button,
	Group,
	NumberFormatter,
	NumberInput,
	Stack,
	Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import dayjs from 'dayjs';
import { useState } from 'react';

import { useCreateTrade } from '@/entities/trade';
import { DATE_TIME_DISPLAY_FORMAT } from '@/shared/model';

import {
	createTradeRequestFromSignal,
	type TradeFromSignalDraft,
} from '../model/trade-from-signal';

type CreateTradeFromSignalFormValues = {
	quantity: number | '';
};

type CreateTradeFromSignalFormProps = {
	draft: TradeFromSignalDraft;
	onClose: () => void;
};

export function CreateTradeFromSignalForm({ draft, onClose }: CreateTradeFromSignalFormProps) {
	const createTradeMutation = useCreateTrade();
	const [mutationError, setMutationError] = useState<string | null>(null);
	const form = useForm<CreateTradeFromSignalFormValues>({
		mode: 'uncontrolled',
		initialValues: { quantity: 1 },
		validate: {
			quantity: (value) => (
				typeof value !== 'number'
				|| !Number.isInteger(value)
				|| value < 1
			)
			&& 'Введите целое число не меньше 1',
		},
	});

	const handleSubmit = (values: CreateTradeFromSignalFormValues) => {
		if (typeof values.quantity !== 'number') {
			form.setFieldError('quantity', 'Введите целое число не меньше 1');
			return;
		}

		const request = createTradeRequestFromSignal(draft, values.quantity);

		if (!request) {
			form.setFieldError('quantity', 'Не удалось подготовить сделку из сигнала');
			return;
		}

		setMutationError(null);
		createTradeMutation.mutate(
			{ data: request },
			{
				onSuccess: onClose,
				onError: () => {
					setMutationError('Не удалось создать сделку. Проверьте соединение и попробуйте ещё раз.');
				},
			},
		);
	};

	return (
		<form onSubmit={form.onSubmit(handleSubmit)}>
			<Stack gap='md'>
				<Stack gap={4}>
					<Text size='sm' c='dimmed'>Инструмент</Text>
					<Text fw={500}>{draft.ticker}</Text>
				</Stack>

				<Stack gap={4}>
					<Text size='sm' c='dimmed'>Направление</Text>
					<Text fw={500}>{draft.direction === 'buy' ? 'Long' : 'Short'}</Text>
				</Stack>

				<Stack gap={4}>
					<Text size='sm' c='dimmed'>Цена сигнала</Text>
					<Text fw={500}>
						<NumberFormatter value={draft.close} suffix=' ₽' decimalScale={3} thousandSeparator='&#8201;' />
					</Text>
				</Stack>

				<Stack gap={4}>
					<Text size='sm' c='dimmed'>Дата и время сигнала</Text>
					<Text fw={500}>{dayjs(draft.occurredAt).format(DATE_TIME_DISPLAY_FORMAT)}</Text>
				</Stack>

				<NumberInput
					label='Количество'
					min={1}
					step={1}
					allowDecimal={false}
					allowNegative={false}
					withAsterisk
					key={form.key('quantity')}
					{...form.getInputProps('quantity')}
				/>

				{mutationError && (
					<Text c='red' size='sm' role='alert'>
						{mutationError}
					</Text>
				)}

				<Group justify='flex-end' mt='sm'>
					<Button variant='default' onClick={onClose} disabled={createTradeMutation.isPending}>
						Отмена
					</Button>
					<Button type='submit' loading={createTradeMutation.isPending} disabled={createTradeMutation.isPending}>
						Создать сделку
					</Button>
				</Group>
			</Stack>
		</form>
	);
}
