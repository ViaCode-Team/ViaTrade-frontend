import {
	Flex,
	Text,
	Title,
} from '@mantine/core';
import { Suspense } from 'react';

import { StrategiesGrid } from './ui/strategies-grid';
import { StrategiesGridSkeleton } from './ui/strategies-grid.skeleton';

export function StrategiesPage() {
	return (
		<>
			<Flex direction='column' gap='xs'>
				<Title order={1}>Стратегии</Title>
				<Text c='dimmed'>
					Подберите стратегию под свой стиль торговли и горизонт инвестирования.
				</Text>
			</Flex>

			<Suspense fallback={<StrategiesGridSkeleton />}>
				<StrategiesGrid />
			</Suspense>
		</>
	);
}
