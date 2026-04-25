import {
	Button,
	Card,
	Checkbox,
	Flex,
	Group,
	Progress,
	Stack,
	Text,
	Title,
	Tooltip,
} from '@mantine/core';
import { generatePath, Link as RouterLink } from 'react-router';

import type { Strategy } from '@/entities/strategy';

import { getAccuracyColor } from '@/entities/strategy';
import { ROUTES } from '@/shared/model/routes';

import cls from './strategy-card.module.css';

type StrategyCardProps = {
	strategy: Strategy;
	onActiveChange: (strategyId: string, isActive: boolean) => void;
};

export function StrategyCard({ strategy, onActiveChange }: StrategyCardProps) {
	const activeColor = strategy.isActive
		? 'var(--mantine-color-green-7)'
		: 'var(--mantine-color-red-7)';

	const strategyPath = generatePath(ROUTES.STRATEGY, {
		strategyName: strategy.id,
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
			style={{ borderLeftColor: activeColor }}
		>
			<RouterLink
				to={strategyPath}
				className={cls.cardLink}
				aria-label={`Открыть стратегию ${strategy.name}`}
			/>

			<div className={cls.content}>
				<Group justify='space-between' align='flex-start' gap='sm'>
					<Title order={4} className={cls.title} lineClamp={1}>
						{strategy.name}
					</Title>

					<Tooltip label={activeActionLabel}>
						<Checkbox
							checked={strategy.isActive}
							onChange={(event) => {
								onActiveChange(strategy.id, event.currentTarget.checked);
							}}
							className={cls.cardAction}
							styles={{
								root: {
									'--checkbox-size': '22px',
								},
							}}
							aria-label={`${activeActionLabel} ${strategy.name}`}
						/>
					</Tooltip>
				</Group>

				<Text size='sm' c='dimmed' lineClamp={2}>
					{strategy.description}
				</Text>

				<Stack gap='xs'>
					<Flex justify='space-between' gap='md'>
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

					<Stack gap={4}>
						<Flex justify='space-between' wrap='nowrap'>
							<Text size='sm' c='dimmed'>
								Точность
							</Text>

							<Text size='sm' fw='bold'>
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
			</div>

			<Button
				type='button'
				variant='default'
				className={cls.cardAction}
				onClick={() => {
					// TODO: связать стратегию с акцией
				}}
			>
				Связать с акцией
			</Button>
		</Card>
	);
}
