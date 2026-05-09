import {
	Badge,
	Card,
	Flex,
	Progress,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { generatePath, Link as RouterLink } from 'react-router';

import type { StockLinkedStrategy } from '@/entities/stock';

import { getAccuracyColor } from '@/entities/strategy';
import { getLeftBorderCardStyle } from '@/shared/lib/left-border-card';
import { ROUTES } from '@/shared/model/routes';
import { InfoPair } from '@/shared/ui/info-pair';

import cls from './stock-linked-strategy-card.module.css';

type StockLinkedStrategyCardProps = {
	strategy: StockLinkedStrategy;
};

export function StockLinkedStrategyCard({ strategy }: StockLinkedStrategyCardProps) {
	const strategyPath = generatePath(ROUTES.STRATEGY, {
		strategyName: String(strategy.id),
	});
	const leftBorderStyle = getLeftBorderCardStyle({
		color: strategy.isActive
			? 'var(--mantine-color-green-light)'
			: 'var(--mantine-color-red-light)',
		hoverColor: strategy.isActive
			? 'var(--mantine-color-green-filled)'
			: 'var(--mantine-color-red-filled)',
	});

	return (
		<Card
			component={RouterLink}
			to={strategyPath}
			aria-label={`Открыть стратегию ${strategy.name}`}
			bg='transparent'
			withBorder
			variant='left-border'
			style={leftBorderStyle}
			className={cls.root}
		>
			<Stack gap='xs'>
				<Flex justify='space-between' align='flex-start' gap='xs'>
					<Title order={4} lineClamp={1} className={cls.title}>
						{strategy.name}
					</Title>

					<Badge color={strategy.isActive ? 'green' : 'red'} variant='light' size='sm'>
						{strategy.isActive ? 'Активна' : 'Выключена'}
					</Badge>
				</Flex>

				<Text size='sm' c='dimmed' lineClamp={2}>
					{strategy.description}
				</Text>
			</Stack>

			<InfoPair
				mt='auto'
				items={[
					{
						label: 'Частота сигнала',
						value: strategy.signalFrequency,
					},
					{
						label: 'Инвест горизонт',
						value: strategy.investmentHorizon,
					},
				]}
			/>

			<Flex direction='column' gap={4}>
				<Flex justify='space-between' wrap='nowrap'>
					<Text size='sm' c='dimmed'>
						Точность
					</Text>
					<Text size='sm' fw='bold' c={getAccuracyColor(strategy.accuracy)}>
						{strategy.accuracy}
						%
					</Text>
				</Flex>

				<Progress
					value={strategy.accuracy}
					bg='gray.4'
					color={getAccuracyColor(strategy.accuracy)}
				/>
			</Flex>

		</Card>
	);
}
