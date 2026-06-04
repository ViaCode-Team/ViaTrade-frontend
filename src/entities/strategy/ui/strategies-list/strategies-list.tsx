import { SimpleGrid, Stack } from '@mantine/core';

import {
	type Strategy,
	StrategyCard,
	toStrategyCardStrategy,
} from '@/entities/strategy';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';

export { StrategiesListSkeleton } from './strategies-list.skeleton';

export type StrategiesListProps = {
	strategies: Strategy[];
	hasAnyStrategies: boolean;
	actionSlot?: (strategy: Strategy) => React.ReactNode;
	bottomActionSlot?: (strategy: Strategy) => React.ReactNode;
};

export function StrategiesList({ strategies, hasAnyStrategies, actionSlot, bottomActionSlot }: StrategiesListProps) {
	if (!hasAnyStrategies) {
		return <EmptyState title='Стратегий пока нет' description='Нажмите «Создать», чтобы добавить первую стратегию.' />;
	}

	if (strategies.length === 0) {
		return <EmptyState title='Стратегии не найдены' description='Очистите поиск или измените параметры фильтрации.' />;
	}

	return (
		<Stack gap='md'>
			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{strategies.map((strategy) => (
					<li key={strategy.id}>
						<StrategyCard
							strategy={toStrategyCardStrategy(strategy, strategy.isActive)}
							actionSlot={actionSlot?.(strategy)}
							bottomActionSlot={bottomActionSlot?.(strategy)}
						/>
					</li>
				))}
			</SimpleGrid>
		</Stack>
	);
}
