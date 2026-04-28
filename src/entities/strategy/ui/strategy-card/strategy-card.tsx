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

import { getLeftBorderCardStyle } from '@/shared/lib/left-border-card';
import { ROUTES } from '@/shared/model/routes';
import { InfoPair } from '@/shared/ui/info-pair';

import type { Strategy } from '../../model';

import { getAccuracyColor } from '../../model';
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
							size='md'
							aria-label={`${activeActionLabel} ${strategy.name}`}
						/>
					</Tooltip>
				</Flex>

				<Text size='sm' c='dimmed' lineClamp={2}>
					{strategy.description}
				</Text>
			</Flex>
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
