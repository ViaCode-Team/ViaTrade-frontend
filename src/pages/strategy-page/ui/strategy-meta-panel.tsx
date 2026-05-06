import {
	Flex,
	Group,
	Progress,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconChartBar, IconClock, IconRoute } from '@tabler/icons-react';

import type { Strategy } from '@/entities/strategy';

import { getAccuracyColor } from '@/entities/strategy';

import { AccuracyHelp } from './accuracy-help';

type StrategyMetaPanelProps = {
	strategy: Strategy;
};

export function StrategyMetaPanel({ strategy }: StrategyMetaPanelProps) {
	const metaItems = [
		{
			title: 'Частота сигнала',
			value: strategy.signalFrequency,
			icon: <IconClock size={22} />,
		},
		{
			title: 'Инвест горизонт',
			value: strategy.investmentHorizon,
			icon: <IconRoute size={22} />,
		},
	];

	return (
		<Stack gap='lg'>
			<SimpleGrid
				type='container'
				cols={{ base: 1, '450px': 2 }}
				spacing='sm'
			>
				{metaItems.map((item) => (
					<Stack key={item.title} gap={6}>
						<Group gap={8} wrap='nowrap'>
							{item.icon}

							<Title order={5} c='dimmed'>
								{item.title}
							</Title>
						</Group>

						<Text size='lg' fw={600}>
							{item.value}
						</Text>
					</Stack>
				))}
			</SimpleGrid>

			{strategy.accuracy && (
				<Flex direction='column' gap='sm'>
					<Flex justify='space-between' align='center' gap='md'>
						<Group gap={2}>
							<Group gap={8} wrap='nowrap'>
								<IconChartBar size={22} />

								<Title order={5} c='dimmed'>
									Точность
								</Title>
							</Group>

							<AccuracyHelp />
						</Group>

						<Title order={4} c={getAccuracyColor(strategy.accuracy)}>
							{strategy.accuracy}
							%
						</Title>
					</Flex>

					<Progress
						value={strategy.accuracy}
						color={getAccuracyColor(strategy.accuracy)}
						size='md'
					/>
				</Flex>
			)}
		</Stack>
	);
}
