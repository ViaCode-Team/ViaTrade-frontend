import { Box, Stack, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router';

import { type Signal, SignalsList } from '@/entities/signal';
import { ROUTES } from '@/shared/model';

const exampleSignals: Signal[] = [
	{
		id: '1',
		asset: 'SBER',
		instrumentId: 1,
		strategyId: 1,
		date: '2024-03-10',
		occurredAt: '2024-03-10T10:00:00Z',
		close: 295.4,
		direction: 'buy',
		confidence: 87,
		strategy: 'Импульс',
	},
	{
		id: '2',
		asset: 'GAZP',
		instrumentId: 2,
		strategyId: 2,
		date: '2024-03-12',
		occurredAt: '2024-03-12T14:30:00Z',
		close: 162.8,
		direction: 'sell',
		confidence: 76,
		strategy: 'Возврат к среднему',
	},
	{
		id: '3',
		asset: 'LKOH',
		instrumentId: 3,
		strategyId: 3,
		date: '2024-03-14',
		occurredAt: '2024-03-14T11:15:00Z',
		close: 7350.0,
		direction: 'hold',
		confidence: 68,
		strategy: 'Пробой уровня',
	},
];

export function ExampleSignals() {
	const navigate = useNavigate();

	return (
		<Box py={80} pos='relative'>
			<Stack gap={50}>
				<Stack gap='sm' align='center'>
					<Title order={2} ta='center'>
						Примеры
						{' '}
						<Text component='span' c='brand' inherit>
							торговых сигналов
						</Text>
					</Title>
					<Text c='dimmed' ta='center' fz='lg' maw={600}>
						Мы используем проверенные стратегии для анализа рынка.
					</Text>
				</Stack>

				<SignalsList
					signals={exampleSignals}
					onSignalSelect={() => navigate(ROUTES.LOGIN)}
				/>
			</Stack>
		</Box>
	);
}
