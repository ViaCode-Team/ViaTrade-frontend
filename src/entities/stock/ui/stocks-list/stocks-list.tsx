import {
	Center,
	Pagination,
	SimpleGrid,
	Stack,
} from '@mantine/core';

import type { PaginationConfig } from '@/shared/model';

import { CONTENT_GRID_SPACING } from '@/shared/model';

import type { Stock } from '../../model';

import { StockCard } from '../stock-card';

export type StocksListProps = {
	stocks: Stock[];
	onLinkedStrategiesClick: (stock: Stock) => void;
	pagination?: PaginationConfig;
};

export function StocksList({
	stocks,
	onLinkedStrategiesClick,
	pagination,
}: StocksListProps) {
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
							onLinkedStrategiesClick={() => {
								onLinkedStrategiesClick(stock);
							}}
						/>
					</li>
				))}
			</SimpleGrid>

			{pagination && (
				<Center>
					<Pagination
						total={pagination.totalPages}
						value={pagination.page}
						onChange={pagination.onPageChange}
					/>
				</Center>
			)}
		</Stack>
	);
}
