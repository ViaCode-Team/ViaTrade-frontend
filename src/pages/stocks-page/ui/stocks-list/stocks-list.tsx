import { SimpleGrid } from '@mantine/core';
import { useSuspenseQuery } from '@tanstack/react-query';

import { type Stock, StockCard } from '@/entities/stock';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { stocksQueryOptions } from '../../model/stocks-query';
import cls from '../../stocks-page.module.css';
import { StocksListSkeleton } from './stocks-list.skeleton';

type StocksListProps = {
	searchQuery: string;
	onLinkedStrategiesClick: (stock: Stock) => void;
};

export function StocksList({
	searchQuery,
	onLinkedStrategiesClick,
}: StocksListProps) {
	const { data: filteredStocks } = useSuspenseQuery(
		stocksQueryOptions(searchQuery),
	);

	if (filteredStocks.length === 0) {
		return (
			<EmptyState
				title='Акции не найдены'
				description='Попробуйте изменить поисковый запрос'
			/>
		);
	}

	return (
		<SimpleGrid
			minColWidth={300}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
			className={cls.grid}
		>
			{filteredStocks.map((stock) => (
				<li key={stock.id} className={cls.item}>
					<StockCard
						stock={stock}
						onLinkedStrategiesClick={() => {
							onLinkedStrategiesClick(stock);
						}}
					/>
				</li>
			))}
		</SimpleGrid>
	);
}

export const StocksListBoundary = withQueryBoundary(StocksList, {
	suspenseProps: {
		fallback: <StocksListSkeleton />,
	},
});
