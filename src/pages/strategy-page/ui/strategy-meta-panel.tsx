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

import cls from '../strategy-page.module.css';
import { AccuracyHelp } from './accuracy-help';

type StrategyMetaPanelProps = {
	strategy: Strategy;
};

export function StrategyMetaPanel({ strategy }: StrategyMetaPanelProps) {
	const accuracyColor = getAccuracyColor(strategy.accuracy);

	return (
		<Stack gap='lg'>
			<Stack gap='sm' className={cls.accuracyBlock}>
				<Flex justify='space-between' align='center' gap='md'>

					<Group gap={2}>
						<Group gap={8}>
							<IconChartBar size={22} stroke={2} className={cls.metaIcon} />

							<Title order={5} c='dimmed'>
								Точность
							</Title>
						</Group>

						<AccuracyHelp />
					</Group>

					<Text
						size='sm'
						fw={800}
						c={accuracyColor}
						className={cls.accuracyValue}
					>
						{strategy.accuracy}
						%
					</Text>

				</Flex>

				<Progress
					value={strategy.accuracy}
					color={accuracyColor}
					size='md'
				/>
			</Stack>

			<SimpleGrid
				type='container'
				cols={{ base: 1, '450px': 2 }}
				spacing='sm'
			>
				<Stack gap={6}>
					<Group gap={8} wrap='nowrap'>
						<IconClock size={22} stroke={2} className={cls.metaIcon} />

						<Title order={5} c='dimmed'>
							Частота сигнала
						</Title>
					</Group>

					<Text size='lg' fw={600}>
						{strategy.signalFrequency}
					</Text>
				</Stack>

				<Stack gap={6}>
					<Group gap={4} wrap='nowrap'>
						<IconRoute size={22} stroke={2} className={cls.metaIcon} />

						<Title order={5} c='dimmed'>
							Горизонт
						</Title>
					</Group>

					<Text size='lg' fw={600}>
						{strategy.investmentHorizon}
					</Text>
				</Stack>
			</SimpleGrid>
		</Stack>
	);
}
