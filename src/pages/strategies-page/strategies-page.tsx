import {
	Flex,
	SimpleGrid,
	Text,
	Title,
} from '@mantine/core';
import { useState } from 'react';

import { mockStrategies, StrategyCard } from '@/entities/strategy';
import {
	CONTENT_GRID_SPACING,
} from '@/shared/model/layout';

import cls from './strategies-page.module.css';

export function StrategiesPage() {
	const [strategies, setStrategies] = useState(mockStrategies);

	function handleActiveChange(strategyId: string, isActive: boolean) {
		setStrategies((currentStrategies) =>
			currentStrategies.map((strategy) =>
				strategy.id === strategyId ? { ...strategy, isActive } : strategy,
			),
		);
	}

	return (
		<>
			<Flex direction='column' gap='xs'>
				<Title order={1}>Стратегии</Title>
				<Text c='dimmed'>
					Подберите стратегию под свой стиль торговли и горизонт инвестирования.
				</Text>
			</Flex>

			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
				className={cls.grid}
			>
				{strategies.map((strategy) => (
					<li key={strategy.id} className={cls.item}>
						<StrategyCard
							strategy={strategy}
							onActiveChange={handleActiveChange}
						/>
					</li>
				))}
			</SimpleGrid>
		</>
	);
}
