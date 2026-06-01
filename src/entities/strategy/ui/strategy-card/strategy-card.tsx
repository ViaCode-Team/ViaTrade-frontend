import type { ReactNode } from 'react';

import {
	Badge,
	Box,
	Card,
	Flex,
	Progress,
	Text,
	Title,
} from '@mantine/core';
import { generatePath, Link as RouterLink } from 'react-router';

import { getLeftBorderCardStyle } from '@/shared/lib/left-border-card';
import { ROUTES } from '@/shared/model/routes';
import { InfoPair } from '@/shared/ui/info-pair';

import type { StrategyCardStrategy } from '../../model';

import { getAccuracyColor } from '../../model';
import cls from './strategy-card.module.css';

type StrategyCardProps = {
	strategy: StrategyCardStrategy;
	onLinkClick?: () => void;
	actionSlot?: ReactNode;
	bottomActionSlot?: ReactNode;
};

export function StrategyCard({
	strategy,
	onLinkClick,
	actionSlot,
	bottomActionSlot,
}: StrategyCardProps) {
	const strategyPath = generatePath(ROUTES.STRATEGY, {
		strategyName: strategy.name,
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
			component='article'
			bg='transparent'
			withBorder
			className={cls.root}
			variant='left-border'
			style={leftBorderStyle}
		>
			<RouterLink
				to={strategyPath}
				className={cls.cardLink}
				aria-label={`Открыть стратегию ${strategy.name}`}
				onClick={onLinkClick}
			/>

			<Flex direction='column' gap='xs'>
				<Flex justify='space-between' align='flex-start' gap='xs'>
					<Title order={4} className={cls.title} lineClamp={1}>
						{strategy.name}
					</Title>

					{actionSlot || (
						<Badge color={strategy.isActive ? 'green' : 'red'} variant='light' size='sm'>
							{strategy.isActive ? 'Активна' : 'Выключена'}
						</Badge>
					)}
				</Flex>

				<Text size='sm' c='dimmed' lineClamp={2}>
					{strategy.description ?? 'Описание стратегии пока не заполнено.'}
				</Text>
			</Flex>

			<InfoPair
				mt='auto'
				items={[
					{
						label: 'Частота сигнала',
						value: strategy.signalFrequency ?? 'Не указана',
					},
					{
						label: 'Инвест горизонт',
						value: strategy.investmentHorizon ?? 'Не указана',
					},
				]}
			/>

			{strategy.accuracy
				? (
						<Flex direction='column' gap={4}>
							<Flex justify='space-between' wrap='nowrap'>
								<Text size='sm' c='dimmed'>
									Точность
								</Text>

								<Text
									size='sm'
									fw='bold'
									c={getAccuracyColor(strategy.accuracy)}
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
						</Flex>
					)
				: <Box h={33}></Box>}

			{bottomActionSlot}
		</Card>
	);
}
