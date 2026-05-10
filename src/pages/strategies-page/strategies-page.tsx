import {
	Flex,
	Text,
	Title,
} from '@mantine/core';

import { StrategiesListBoundary } from './ui/strategies-grid';

export function StrategiesPage() {
	return (
		<>
			<Flex direction='column' gap='xs'>
				<Title order={1}>Стратегии</Title>
				<Text c='dimmed'>
					Подберите стратегию под свой стиль торговли и горизонт инвестирования.
				</Text>
			</Flex>

			<StrategiesListBoundary />
		</>
	);
}
