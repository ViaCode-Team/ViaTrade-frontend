import {
	Button,
	Card,
	Checkbox,
	Flex,
	Progress,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';
import { generatePath, Link as RouterLink } from 'react-router';

import type { Strategy } from '@/entities/strategy';

import { getAccuracyColor } from '@/entities/strategy';
import { getLeftBorderCardStyle } from '@/shared/lib/left-border-card';
import { ROUTES } from '@/shared/model/routes';

import cls from './strategy-card.module.css';

type StrategyCardProps = {
	strategy: Strategy;
	onActiveChange: (strategyId: string, isActive: boolean) => void;
};

export function StrategyCard({ strategy, onActiveChange }: StrategyCardProps) {
	const strategyPath = generatePath(ROUTES.STRATEGY, {
		strategyName: strategy.id,
	});
	const leftBorderStyle = getLeftBorderCardStyle({
		color: strategy.isActive
			? 'var(--mantine-color-green-light)'
			: 'var(--mantine-color-red-light)',
		hoverColor: strategy.isActive
			? 'var(--mantine-color-green-filled)'
			: 'var(--mantine-color-red-filled)',
	});

	const activeActionLabel = strategy.isActive
		? 'Деактивировать стратегию'
		: 'Активировать стратегию';

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
			/>

			<Flex direction='column' gap='xs'>
				<Flex justify='space-between' align='flex-start' gap='xs'>
					<Title order={4} className={cls.title} lineClamp={1}>
						{strategy.name}
					</Title>

					<Tooltip label={activeActionLabel}>
						<Checkbox
							checked={strategy.isActive}
							onChange={(event) => {
								onActiveChange(strategy.id, event.currentTarget.checked);
							}}
							styles={{
								root: {
									'--checkbox-size': '22px',
								},
							}}
							aria-label={`${activeActionLabel} ${strategy.name}`}
						/>
					</Tooltip>
				</Flex>

				<Text size='sm' c='dimmed' lineClamp={2}>
					{strategy.description}
				</Text>
			</Flex>

			<Flex justify='space-between' mt='auto' gap='md'>
				<Flex direction='column' flex={1}>
					<Text size='sm' c='dimmed'>
						Частота сигнала
					</Text>

					<Text fw='bold' lineClamp={1}>
						{strategy.signalFrequency}
					</Text>
				</Flex>

				<Flex direction='column' flex={1}>
					<Text size='sm' c='dimmed' ta='end'>
						Инвест горизонт
					</Text>

					<Text fw='bold' ta='end' lineClamp={1}>
						{strategy.investmentHorizon}
					</Text>
				</Flex>
			</Flex>

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

			<Button
				type='button'
				variant='default'
				onClick={() => {
					// TODO: связать стратегию с акцией
				}}
			>
				Связать с акцией
			</Button>
		</Card>
	);
}
