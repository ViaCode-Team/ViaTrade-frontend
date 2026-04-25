import { SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useState } from 'react';

import { mockStrategies } from '@/entities/strategy';

import cls from './strategies-page.module.css';
import { StrategyCard } from './ui/strategy-card';

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
		<Stack gap='lg'>
			<Stack gap='xs'>
				<Title order={2} className={cls.pageTitle}>Стратегии</Title>
				<Text size='sm' c='dimmed'>
					Подберите стратегию под свой стиль торговли и горизонт инвестирования.
				</Text>
			</Stack>

			<SimpleGrid minColWidth={400} spacing='lg' component='ul' className={cls.grid}>
				{strategies.map((strategy) => (
					<li key={strategy.id} className={cls.item}>
						<StrategyCard
							strategy={strategy}
							onActiveChange={handleActiveChange}
						/>
					</li>
				))}
			</SimpleGrid>
		</Stack>
	);
}
