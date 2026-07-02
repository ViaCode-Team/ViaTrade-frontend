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
import { IconChevronDown } from '@tabler/icons-react';
import { IconChevronUp } from '@tabler/icons-react';
import { IconSelector } from '@tabler/icons-react';

import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import type { TradeFilters } from '../filter-trades';

import { TradesHistoryTableRow } from './trades-history-table-row';
import { TradesHistoryTableSkeleton } from './trades-history-table.skeleton';
import { useTradesHistoryTable } from './use-trades-history-table';

const COLUMNS: { field: TradeFilters['fieldSort']; label: string }[] = [
	{ field: 'ticker', label: 'Тикер' },
	{ field: 'type', label: 'Тип' },
	{ field: 'dateOpen', label: 'Открытие' },
	{ field: 'dateClose', label: 'Закрытие' },
	{ field: 'tradeOpen', label: 'Цена откр.' },
	{ field: 'tradeClose', label: 'Цена закр.' },
	{ field: 'count', label: 'Кол-во' },
	{ field: 'sum', label: 'Сумма' },
	{ field: 'income', label: 'Прибыль, %' },
];

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
			<UnstyledButton w='100%' onClick={onSort} disabled={disabled} opacity={disabled ? 0.5 : 1}>
				<Group justify='space-between' wrap='nowrap' gap={4}>
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

function TradesHistoryTable() {
	const {
		trades,
		paginatedTrades,
		totalPages,
		fieldSort,
		directionSort,
		page,
		isFetching,
		setSorting,
		setPage,
	} = useTradesHistoryTable();

	if (trades.length === 0) {
		return (
			<AppEmptyState title='Нет сделок' description='Запишите вашу первую сделку в дневник.' />
		);
	}

	return (
		<Stack gap='xs'>
			<ScrollArea>
				<Table highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							{COLUMNS.map(({ field, label }) => (
								<Th
									key={field}
									sorted={fieldSort === field}
									reversed={directionSort === 'desc'}
									onSort={() => setSorting(field)}
									disabled={isFetching}
								>
									{label}
								</Th>
							))}
							<Table.Th />
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{paginatedTrades.length > 0
							? paginatedTrades.map((trade) => <TradesHistoryTableRow key={trade.id} trade={trade} />)
							: (
									<Table.Tr>
										<Table.Td colSpan={10}>
											<AppEmptyState
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
