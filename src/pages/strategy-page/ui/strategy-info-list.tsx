import { SimpleGrid } from '@mantine/core';
import {
	IconAlertTriangle,
	IconTargetArrow,
	IconTrendingUp,
} from '@tabler/icons-react';

import type { Strategy } from '@/entities/strategy';

import { mapTradeStrategyToStrategy, useGetByIdSuspense } from '@/entities/strategy';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { StrategyInfoCard } from './strategy-info-card';
import { StrategyInfoListSkeleton } from './strategy-info-list.skeleton';

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

type StrategyInfoListProps = {
	strategyId: number;
};

function StrategyInfoList({ strategyId }: StrategyInfoListProps) {
	const strategyQuery = useGetByIdSuspense(strategyId);
	const strategy = mapTradeStrategyToStrategy(strategyQuery.data.data, INACTIVE_STRATEGY_IDS);

	if (!strategy) {
		return null;
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
		return <EmptyState title='Информация о стратегии не заполнена' />;
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

export const StrategyInfoListBoundary = withQueryBoundary(StrategyInfoList, {
	suspenseProps: { fallback: <StrategyInfoListSkeleton /> },
});
