import type { ReactNode } from 'react';

import {
	Badge,
	Card,
	Group,
	Stack,
	Text,
	Title,
} from '@mantine/core';
import { IconChartLine, IconClock } from '@tabler/icons-react';

import type { Strategy } from '../model/strategies';

import { getAccuracyColor } from '../model/strategies';
import cls from './strategy-card.module.css';

type StrategyCardProps = {
	strategy: Strategy;
};

type StrategyMetricProps = {
	icon: ReactNode;
	label: string;
	value: string;
};

function StrategyMetric({ icon, label, value }: StrategyMetricProps) {
	return (
		<div className={cls.metric}>
			<div className={cls.metricLabelWrap}>
				<span className={cls.metricIcon}>{icon}</span>
				<Text size='sm' className={cls.metricLabel}>
					{label}
				</Text>
			</div>
			<Text size='sm' className={cls.metricValue}>
				{value}
			</Text>
		</div>
	);
}

export function StrategyCard({ strategy }: StrategyCardProps) {
	const accuracyColor = getAccuracyColor(strategy.accuracy);
	const metricBorderColor = accuracyColor === 'green'
		? 'var(--mantine-color-green-7)'
		: accuracyColor === 'red'
			? 'var(--mantine-color-red-7)'
			: 'var(--mantine-color-yellow-7)';

	return (
		<Card
			bg='transparent'
			withBorder
			p='lg'
			className={cls.root}
			style={{ borderLeftColor: metricBorderColor }}
		>
			<Group justify='space-between' align='flex-start' gap='sm'>
				<Title order={4} className={cls.title}>
					{strategy.name}
				</Title>
				<Badge variant='light' color={accuracyColor}>
					{`Точность ${strategy.accuracy}%`}
				</Badge>
			</Group>

			<Text size='sm' c='dimmed' lineClamp={2}>
				{strategy.description}
			</Text>

			<Stack gap={4} mt='auto'>
				<StrategyMetric
					icon={<IconChartLine size={16} />}
					label='Частота сигналов'
					value={strategy.signalFrequency}
				/>
				<StrategyMetric
					icon={<IconClock size={16} />}
					label='Инвест. горизонт'
					value={strategy.investmentHorizon}
				/>
			</Stack>
		</Card>
	);
}
