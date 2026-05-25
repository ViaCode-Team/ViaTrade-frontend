import {
	Badge,
	Box,
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

import type { StrategyCardStrategy } from '../../model';

import { getAccuracyColor } from '../../model';
import cls from './strategy-card.module.css';

type StrategyCardProps = {
	strategy: StrategyCardStrategy;
	onLinkClick?: () => void;
	activation?: {
		isActiveChangePending?: boolean;
		onActiveChange: (strategyId: number, isActive: boolean) => void;
	};
	stockBinding?: {
		onStockBindClick: (strategyId: number) => void;
	};
};

export function StrategyCard({
	strategy,
	onLinkClick,
	activation,
	stockBinding,
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

	const activeActionLabel = strategy.isActive
		? 'Выключить сигналы'
		: 'Включить сигналы';

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

					{activation
						? (
								<Box className={cls.interactiveAction}>
									<Tooltip label={activeActionLabel}>
										<Checkbox
											checked={strategy.isActive}
											onChange={(event) => {
												activation.onActiveChange(
													strategy.id,
													event.currentTarget.checked,
												);
											}}
											size='md'
											disabled={activation.isActiveChangePending}
											aria-label={activeActionLabel}
										/>
									</Tooltip>
								</Box>
							)
						: (
								<Badge color={strategy.isActive ? 'green' : 'red'} variant='light' size='sm'>
									{strategy.isActive ? 'Активна' : 'Выключена'}
								</Badge>
							)}
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

			{stockBinding && (
				<Button
					mt='auto'
					type='button'
					variant='default'
					className={cls.interactiveAction}
					onClick={() => {
						stockBinding.onStockBindClick(strategy.id);
					}}
				>
					Связать с акцией
				</Button>
			)}
		</Card>
	);
}
