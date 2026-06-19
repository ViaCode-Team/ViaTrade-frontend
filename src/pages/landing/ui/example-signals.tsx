import { Box, Stack, Text, Title } from '@mantine/core';

import { type Signal, SignalsList } from '@/entities/signal';

const exampleSignals: Signal[] = [
	{
		id: '1',
		asset: 'SBER',
		tradeCode: 'SBER',
		date: '2024-03-10',
		dateTime: '2024-03-10T10:00:00Z',
		close: 295.4,
		direction: 'buy',
		strategy: 'Импульс',
	},
	{
		id: '2',
		asset: 'GAZP',
		tradeCode: 'GAZP',
		date: '2024-03-12',
		dateTime: '2024-03-12T14:30:00Z',
		close: 162.8,
		direction: 'sell',
		strategy: 'Возврат к среднему',
	},
	{
		id: '3',
		asset: 'LKOH',
		tradeCode: 'LKOH',
		date: '2024-03-14',
		dateTime: '2024-03-14T11:15:00Z',
		close: 7350.0,
		direction: 'hold',
		strategy: 'Пробой уровня',
	},
];

export function ExampleSignals() {
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
					hasAnySignals={true}
					onSignalSelect={() => {}}
				/>
			</Stack>
		</Box>
	);
}
