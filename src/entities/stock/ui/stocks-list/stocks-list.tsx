import { SimpleGrid, Stack } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model';
import { AppEmptyState } from '@/shared/ui/app-empty-state';

import type { Stock } from '../../model';

import { StockCard } from '../stock-card';

export { StocksListSkeleton } from './stocks-list.skeleton';

export type StocksListProps = {
	stocks: Stock[];
	hasFilters: boolean;
	linkCountsByStockId: Map<number, number>;
	onLinkedStrategiesClick: (stock: Stock) => void;
};

export function StocksList({
	stocks,
	hasFilters,
	linkCountsByStockId,
	onLinkedStrategiesClick,
}: StocksListProps) {
	if (stocks.length === 0) {
		if (!hasFilters) {
			return (
				<Stack gap='md'>
					<AppEmptyState
						title='Нет акций'
						description='В системе пока нет доступных акций.'
					/>
				</Stack>
			);
		}

		return (
			<Stack gap='md'>
				<AppEmptyState
					title='Ничего не найдено'
					description='Попробуйте изменить поисковый запрос или фильтры.'
				/>
			</Stack>
		);
	}

	return (
		<Stack gap='md'>
			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{stocks.map((stock) => (
					<li key={stock.id}>
						<StockCard
							stock={stock}
							linkedStrategiesCount={linkCountsByStockId.get(stock.instrumentId) || 0}
							onLinkedStrategiesClick={() => {
								onLinkedStrategiesClick(stock);
							}}
						/>
					</li>
				))}
			</SimpleGrid>
		</Stack>
	);
}
