import { Alert, SimpleGrid } from '@mantine/core';
import {
	IconAlertTriangle,
	IconTargetArrow,
	IconTrendingUp,
} from '@tabler/icons-react';

import type { Strategy } from '@/entities/strategy';

import { mapTradeStrategyToStrategy, useGetById } from '@/entities/strategy';

import { StrategyInfoCard } from './strategy-info-card';
import { StrategyInfoGridSkeleton } from './strategy-info-grid.skeleton';

const INACTIVE_STRATEGY_IDS = new Set<number>();

const STRATEGY_INFO_SECTIONS = [
	{
		title: 'Логика стратегии',
		getDescription: (strategy: Strategy) => strategy.logicDescription,
		icon: <IconTrendingUp size={18} stroke={2} />,
	},
	{
		title: 'Когда использовать',
		getDescription: (strategy: Strategy) => strategy.useDescription,
		icon: <IconTargetArrow size={18} stroke={2} />,
	},
	{
		title: 'Ограничения',
		getDescription: (strategy: Strategy) => strategy.limitDescription,
		icon: <IconAlertTriangle size={18} stroke={2} />,
	},
];

type StrategyInfoGridProps = {
	strategyId: number;
};

export function StrategyInfoGrid({ strategyId }: StrategyInfoGridProps) {
	const strategyQuery = useGetById(strategyId);
	const strategy = strategyQuery.data?.data
		? mapTradeStrategyToStrategy(strategyQuery.data.data, INACTIVE_STRATEGY_IDS)
		: null;

	if (strategyQuery.isLoading) {
		return <StrategyInfoGridSkeleton />;
	}

	if (strategyQuery.isError) {
		return (
			<section>
				<Alert color='red' variant='outline'>
					Не удалось загрузить описание стратегии. Попробуйте обновить страницу.
				</Alert>
			</section>
		);
	}

	if (!strategy) {
		return (
			<section>
				<Alert color='red' variant='outline'>
					Описание стратегии не найдено.
				</Alert>
			</section>
		);
	}

	const visibleSections = STRATEGY_INFO_SECTIONS
		.map((section) => ({
			...section,
			description: section.getDescription(strategy),
		}))
		.filter(
			(section): section is typeof section & { description: string } =>
				section.description != null,
		);

	if (visibleSections.length === 0) {
		return null;
	}

	return (
		<section>
			<SimpleGrid minColWidth={300} autoFlow='auto-fit'>
				{visibleSections.map((section) => (
					<StrategyInfoCard
						key={section.title}
						title={section.title}
						description={section.description}
						icon={section.icon}
					/>
				))}
			</SimpleGrid>
		</section>
	);
}
