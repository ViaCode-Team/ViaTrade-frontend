import { SimpleGrid, Stack, Text, Title } from '@mantine/core';

import { mockStrategies } from './model/strategies';
import cls from './strategies-page.module.css';
import { StrategyCard } from './ui/strategy-card';

export function StrategiesPage() {
	return (
		<Stack gap='lg'>
			<Stack gap='xs'>
				<Title order={2} className={cls.pageTitle}>Стратегии</Title>
				<Text size='sm' c='dimmed'>
					Подберите стратегию под свой стиль торговли и горизонт инвестирования.
				</Text>
			</Stack>

			<SimpleGrid minColWidth={400} spacing='lg' component='ul' className={cls.grid}>
				{mockStrategies.map((strategy) => (
					<li key={strategy.id} className={cls.item}>
						<StrategyCard strategy={strategy} />
					</li>
				))}
			</SimpleGrid>
		</Stack>
	);
}
