import type { ReactNode } from 'react';

import {
	SimpleGrid,
	Stack,
	Text,
} from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

import type { Stock, StockLinkedStrategy } from '../../model';

import cls from './stock-card.module.css';

type StockLinkedStrategiesModalProps = {
	stock: Stock;
	renderLinkedStrategy: (strategy: StockLinkedStrategy) => ReactNode;
};

export function StockLinkedStrategiesModal({
	stock,
	renderLinkedStrategy,
}: StockLinkedStrategiesModalProps) {
	return (
		<Stack gap='md'>
			<Text size='sm' c='dimmed'>
				Всего привязано:
				{' '}
				<Text span fw='bold' c='var(--mantine-color-text)'>
					{stock.linkedStrategies.length}
				</Text>
			</Text>

			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{stock.linkedStrategies.map((strategy) => (
					<li key={strategy.id} className={cls.modalStrategyItem}>
						{renderLinkedStrategy(strategy)}
					</li>
				))}
			</SimpleGrid>
		</Stack>
	);
}
