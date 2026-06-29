import { SimpleGrid } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { IconTargetArrow } from '@tabler/icons-react';
import { IconTrendingUp } from '@tabler/icons-react';

import { AppEmptyState } from '@/shared/ui/app-empty-state';

import type { Strategy } from '../../model';

import { StrategyInfoCard } from '../strategy-info-card/strategy-info-card';

export { StrategyInfoListSkeleton } from './strategy-info-list.skeleton';

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

export type StrategyInfoListProps = {
	strategy: Strategy | null;
};

export function StrategyInfoList({ strategy }: StrategyInfoListProps) {
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
		return <AppEmptyState title='Информация о стратегии не заполнена' />;
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
