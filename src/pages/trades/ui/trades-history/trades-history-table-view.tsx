import {
	Center,
	Pagination,
	ScrollArea,
	Stack,
	Table,
} from '@mantine/core';

import type { PaginationConfig } from '@/shared/model';

import { AppEmptyState } from '@/shared/ui/app-empty-state';

import type { TradeFilters } from '../filter-trades';
import type { ProcessedTrade } from './use-trades-history-table';

import { TradesHistorySortableHead } from './trades-history-sortable-head';
import { TradesHistoryTableRow } from './trades-history-table-row';

const COLUMNS: { field: TradeFilters['fieldSort']; label: string }[] = [
	{ field: 'ticker', label: 'Тикер' },
	{ field: 'type', label: 'Тип' },
	{ field: 'openedAt', label: 'Открытие' },
	{ field: 'closedAt', label: 'Закрытие' },
	{ field: 'entryPrice', label: 'Цена откр.' },
	{ field: 'exitPrice', label: 'Цена закр.' },
	{ field: 'quantity', label: 'Кол-во' },
	{ field: 'sum', label: 'Сумма' },
	{ field: 'income', label: 'Прибыль, %' },
];

type TradesHistoryTableViewProps = {
	hasData: boolean;
	paginatedTrades: ProcessedTrade[];
	pagination?: PaginationConfig;
	fieldSort: TradeFilters['fieldSort'];
	directionSort: TradeFilters['directionSort'];
	setSorting: (field: TradeFilters['fieldSort']) => void;
};

export function TradesHistoryTableView({
	hasData,
	paginatedTrades,
	pagination,
	fieldSort,
	directionSort,
	setSorting,
}: TradesHistoryTableViewProps) {
	if (!hasData)
		return <AppEmptyState title='Нет сделок' description='Запишите вашу первую сделку в дневник.' />;

	return (
		<Stack>
			<ScrollArea>
				<Table highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							{COLUMNS.map(({ field, label }) => (
								<TradesHistorySortableHead
									key={field}
									sorted={fieldSort === field}
									reversed={directionSort === 'desc'}
									onSort={() => setSorting(field)}
								>
									{label}
								</TradesHistorySortableHead>
							))}
							<Table.Th />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>


						{paginatedTrades.length
							? paginatedTrades.map((trade) => <TradesHistoryTableRow key={trade.id} trade={trade} />)
							: (
									<Table.Tr>
										<Table.Td colSpan={10}>
											<AppEmptyState title='Сделки не найдены' description='Попробуйте изменить параметры поиска или сбросить фильтры.' />
										</Table.Td>
									</Table.Tr>
								)}
					</Table.Tbody>
				</Table>
			</ScrollArea>

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
