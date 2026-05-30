import type { ReactNode } from 'react';

import {
	Box,
	Center,
	Group,
	Pagination,
	ScrollArea,
	Stack,
	Table,
	Text,
	UnstyledButton,
} from '@mantine/core';
import { IconChevronDown, IconChevronUp, IconSelector } from '@tabler/icons-react';

import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useTradesHistoryData, type UseTradesHistoryDataProps } from '../lib/use-trades-history';
import { TradesHistoryTableRow } from './trades-history-table-row';
import { TradesHistoryTableSkeleton } from './trades-history-table.skeleton';

type ThProps = {
	children: ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort: () => void;
	disabled?: boolean;
};

function Th({
	children,
	reversed,
	sorted,
	onSort,
	disabled,
}: ThProps) {
	const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;

	return (
		<Table.Th>
			<UnstyledButton onClick={onSort} disabled={disabled} style={{ width: '100%', padding: 'var(--mantine-spacing-xs) 0', opacity: disabled ? 0.5 : 1 }}>
				<Group justify='space-between' wrap='nowrap'>
					<Text fw={500} size='sm'>
						{children}
					</Text>
					<Center style={{ flexShrink: 0 }}>
						<Icon size={16} stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</Table.Th>
	);
}

export type TradesHistoryTableProps = UseTradesHistoryDataProps & {
	isFetching: boolean;
	setSorting: (field: any) => void;
	setPage: (page: number) => void;
};

function TradesHistoryTable({
	search,
	typeFilter,
	statusFilter,
	sortField,
	sortDirection,
	page,
	isFetching,
	setSorting,
	setPage,
}: TradesHistoryTableProps) {
	const { trades, paginatedTrades, totalPages } = useTradesHistoryData({
		search,
		typeFilter,
		statusFilter,
		sortField,
		sortDirection,
		page,
	});

	if (trades.length === 0) {
		return (
			<EmptyState title='Нет сделок' description='Запишите вашу первую сделку в дневник.' />
		);
	}

	return (
		<Stack gap='xs'>
			<ScrollArea>
				<Table highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Th sorted={sortField === 'ticker'} reversed={sortDirection === 'desc'} onSort={() => setSorting('ticker')} disabled={isFetching}>Тикер</Th>
							<Th sorted={sortField === 'type'} reversed={sortDirection === 'desc'} onSort={() => setSorting('type')} disabled={isFetching}>Тип</Th>
							<Th sorted={sortField === 'dateOpen'} reversed={sortDirection === 'desc'} onSort={() => setSorting('dateOpen')} disabled={isFetching}>Открытие</Th>
							<Th sorted={sortField === 'dateClose'} reversed={sortDirection === 'desc'} onSort={() => setSorting('dateClose')} disabled={isFetching}>Закрытие</Th>
							<Th sorted={sortField === 'tradeOpen'} reversed={sortDirection === 'desc'} onSort={() => setSorting('tradeOpen')} disabled={isFetching}>Цена откр.</Th>
							<Th sorted={sortField === 'tradeClose'} reversed={sortDirection === 'desc'} onSort={() => setSorting('tradeClose')} disabled={isFetching}>Цена закр.</Th>
							<Th sorted={sortField === 'count'} reversed={sortDirection === 'desc'} onSort={() => setSorting('count')} disabled={isFetching}>Кол-во</Th>
							<Th sorted={sortField === 'sum'} reversed={sortDirection === 'desc'} onSort={() => setSorting('sum')} disabled={isFetching}>Сумма</Th>
							<Th sorted={sortField === 'percent'} reversed={sortDirection === 'desc'} onSort={() => setSorting('percent')} disabled={isFetching}>Прибыль, %</Th>
							<Table.Th />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{paginatedTrades.length > 0
							? paginatedTrades.map((trade) => <TradesHistoryTableRow key={trade.id} trade={trade} />)
							: (
									<Table.Tr>
										<Table.Td colSpan={10}>
											<EmptyState
												title='Сделки не найдены'
												description='Попробуйте изменить параметры поиска или сбросить фильтры.'
											/>
										</Table.Td>
									</Table.Tr>
								)}
					</Table.Tbody>
				</Table>
			</ScrollArea>

			{totalPages > 1 && (
				<ScrollArea>
					<Box w='max-content' mx='auto'>
						<Pagination total={totalPages} value={page} onChange={setPage} withEdges disabled={isFetching} />
					</Box>
				</ScrollArea>
			)}
		</Stack>
	);
}

export const TradesHistoryTableBoundary = withQueryBoundary(TradesHistoryTable, {
	suspenseProps: {
		fallback: <TradesHistoryTableSkeleton />,
	},
});
