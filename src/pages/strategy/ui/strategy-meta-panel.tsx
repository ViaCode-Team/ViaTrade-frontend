import {
	Flex,
	Group,
	Progress,
	SimpleGrid,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconChartBar } from '@tabler/icons-react';
import { IconClock } from '@tabler/icons-react';
import { IconRoute } from '@tabler/icons-react';

import type { Strategy } from '@/entities/strategy';

import { getAccuracyColor } from '@/entities/strategy';
import { HelpTooltip } from '@/shared/ui/help-tooltip';
import { InfoLabel } from '@/shared/ui/info-label';

type StrategyMetaPanelProps = {
	strategy: Strategy;
};

export function StrategyMetaPanel({ strategy }: StrategyMetaPanelProps) {
	const metaItems = [
		{
			id: 'frequency',
			title: (
				<InfoLabel
					label='Частота сигнала'
					tooltipProps={{ text: 'Ожидаемое количество торговых сигналов за определенный период.' }}
				/>
			),
			value: strategy.signalFrequency ?? 'Не указана',
			icon: <IconClock size={22} />,
		},
		{
			id: 'horizon',
			title: (
				<InfoLabel
					label='Инвест горизонт'
					tooltipProps={{ text: 'Рекомендуемый срок удержания позиции для достижения оптимального результата.' }}
				/>
			),
			value: strategy.investmentHorizon ?? 'Не указана',
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
					<Stack key={item.id} gap={6}>
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

							<HelpTooltip
								text='Историческая доля сигналов, которые отработали по правилам стратегии. Показатель не гарантирует будущий результат'
								ariaLabel='Что означает точность стратегии'
								size={20}
								iconSize={18}
							/>
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
