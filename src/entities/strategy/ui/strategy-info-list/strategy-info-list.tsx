import { SimpleGrid } from '@mantine/core';
import { IconAlertTriangle } from '@tabler/icons-react';
import { IconTargetArrow } from '@tabler/icons-react';
import { IconTrendingUp } from '@tabler/icons-react';

import type { Strategy } from '../../model';

import { StrategyInfoCard } from '../strategy-info-card/strategy-info-card';

const STRATEGY_INFO_CONFIGS = [
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
] as const;

function getInfo(strategy: Strategy) {
	return STRATEGY_INFO_CONFIGS.flatMap((config) => {
		const description = config.getDescription(strategy);
		return description ? [{ ...config, description }] : [];
	});
}

export type StrategyInfoListProps = {
	strategy: Strategy;
};

export function StrategyInfoList({ strategy }: StrategyInfoListProps) {
	const strategiesInfo = getInfo(strategy);

	return (
		<SimpleGrid minColWidth={300} component='ul' autoFlow='auto-fit'>
			{strategiesInfo.map((info) => (
				<li key={info.title}>
					<StrategyInfoCard
						title={info.title}
						description={info.description}
						icon={info.icon}
					/>
				</li>
			))}
		</SimpleGrid>
	);
}
