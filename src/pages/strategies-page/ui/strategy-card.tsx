import {
	Badge,
	Button,
	Card,
	Divider,
	Flex,
	Group,
	Progress,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { generatePath, Link as RouterLink } from 'react-router';

import { ROUTES } from '@/shared/model/routes';

import type { Strategy } from '../model/strategies';

import { getAccuracyColor } from '../model/strategies';
import cls from './strategy-card.module.css';

type StrategyCardProps = {
	strategy: Strategy;
};

export function StrategyCard({ strategy }: StrategyCardProps) {
	const activeColor = strategy.isActive
		? 'var(--mantine-color-green-7)'
		: 'var(--mantine-color-red-7)';

	const strategyPath = generatePath(ROUTES.STRATEGY, { strategyName: strategy.id });

	return (
		<Card
			component={RouterLink}
			to={strategyPath}
			bg='transparent'
			withBorder
			className={cls.root}
			style={{ borderLeftColor: activeColor }}
		>
			<Group justify='space-between' align='flex-start' gap='sm'>
				<Title order={4} className={cls.title} lineClamp={1}>
					{strategy.name}
				</Title>
				<Badge
					variant='light'
					color={strategy.isActive ? 'green' : 'red'}
				>
					{strategy.isActive ? 'Активна' : 'Не активна'}
				</Badge>
			</Group>

			<Text size='sm' c='dimmed' lineClamp={2}>
				{strategy.description}
			</Text>


			<Stack gap='xs'>
				<Flex justify='space-between'>
					<Flex direction='column' flex={1}>
						<Text size='sm' c='dimmed'>Частота сигнала</Text>
						<Text fw='bold' lineClamp={1}>
							{strategy.signalFrequency}
						</Text>
					</Flex>
					<Flex direction='column' flex={1}>
						<Text size='sm' c='dimmed' ta='end'>Инвест горизонт</Text>
						<Text fw='bold' ta='end' lineClamp={1}>
							{strategy.investmentHorizon}
						</Text>
					</Flex>
				</Flex>

				<Stack gap={4} flex={1} justify='flex-end'>
					<Flex justify='space-between' wrap='nowrap'>
						<Text size='sm' c='dimmed'>Точность</Text>
						<Text
							size='sm'
							fw='bold'
						>
							{strategy.accuracy}
							%
						</Text>
					</Flex>
					<Progress
						value={strategy.accuracy}
						bg='gray.4'
						color={getAccuracyColor(strategy.accuracy)}
					/>
				</Stack>
			</Stack>

			<Card.Section>
				<Divider />
			</Card.Section>

			<Flex gap='xs'>
				<Button w='100%' variant='default'>Связать с акцией</Button>
				<Button w='100%'>{strategy.isActive ? 'Деактивировать' : 'Активировать' }</Button>
			</Flex>
		</Card>
	);
}
