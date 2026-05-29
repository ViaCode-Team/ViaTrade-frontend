import {
	Badge,
	Box,
	Card,
	Center,
	Group,
	Pagination,
	ScrollArea,
	SegmentedControl,
	Table,
	Text,
	UnstyledButton,
} from '@mantine/core';
import {
	IconChevronDown,
	IconChevronUp,
	IconSelector,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

import { AddTradeButton } from '@/features/statistic/add-trade';
import { CloseTradeButton } from '@/features/statistic/close-trade';
import { DeleteTradeButton } from '@/features/statistic/delete-trade';
import { EditTradeButton } from '@/features/statistic/edit-trade';
import { EmptyState } from '@/shared/ui/empty-state';
import { FiltersGroup } from '@/shared/ui/filters-group';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SearchInput } from '@/shared/ui/search-input';
import { Section } from '@/shared/ui/section';

import { useTradesHistoryData, type UseTradesHistoryDataProps, useTradesHistoryFilters } from '../lib/use-trades-history';
import { TradesHistorySkeleton } from './trades-history.skeleton';

type ThProps = {
	children: React.ReactNode;
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

type TradesHistoryTableProps = UseTradesHistoryDataProps & {
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
			<Box p='xl'>
				<EmptyState title='Нет сделок' description='Вы еще не добавили ни одной сделки.' />
			</Box>
		);
	}

	const rows = paginatedTrades.map((trade) => {
		const isWin = trade.income > 0;
		const isLoss = trade.income < 0;

		return (
			<Table.Tr key={trade.id}>
				<Table.Td>
					<Text size='sm' fw={500}>{trade.ticker}</Text>
				</Table.Td>
				<Table.Td>
					<Badge
						color={trade.isLong ? 'blue' : 'orange'}
						variant='light'
						styles={{ label: { overflow: 'visible', textOverflow: 'clip' } }}
					>
						{trade.isLong ? 'Long' : 'Short'}
					</Badge>
				</Table.Td>
				<Table.Td>{dayjs(trade.dateOpen).format('DD.MM.YYYY HH:mm')}</Table.Td>
				<Table.Td>{trade.dateClose ? dayjs(trade.dateClose).format('DD.MM.YYYY HH:mm') : '—'}</Table.Td>
				<Table.Td style={{ whiteSpace: 'nowrap' }}>
					{trade.tradeOpen.toFixed(2)}
					{' '}
					₽
				</Table.Td>
				<Table.Td style={{ whiteSpace: 'nowrap' }}>{trade.tradeClose ? `${trade.tradeClose.toFixed(2)} ₽` : '—'}</Table.Td>
				<Table.Td style={{ whiteSpace: 'nowrap' }}>{trade.count}</Table.Td>
				<Table.Td style={{ whiteSpace: 'nowrap' }}>
					{trade.netIncome !== undefined && trade.netIncome !== null
						? (
								<Text c={isWin ? 'teal' : isLoss ? 'red' : 'dimmed'} fw={500}>
									{trade.income > 0 ? '+' : ''}
									{trade.income.toFixed(2)}
									{' '}
									₽
								</Text>
							)
						: (
								<Text c='dimmed'>—</Text>
							)}
				</Table.Td>
				<Table.Td style={{ whiteSpace: 'nowrap' }}>
					{trade.netIncome !== undefined && trade.netIncome !== null
						? (
								<Text c={isWin ? 'teal' : isLoss ? 'red' : 'dimmed'} fw={500}>
									{trade.percent > 0 ? '+' : ''}
									{trade.percent.toFixed(2)}
									{' '}
									%
								</Text>
							)
						: (
								<Text c='dimmed'>—</Text>
							)}
				</Table.Td>
				<Table.Td>
					<Group gap='xs' wrap='nowrap' justify='flex-end' align='center'>
						{!trade.dateClose && <CloseTradeButton trade={trade} />}
						<EditTradeButton trade={trade} />
						<DeleteTradeButton trade={trade} />
					</Group>
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<>
			<ScrollArea>
				<Table verticalSpacing='sm' striped highlightOnHover miw={800}>
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
						{rows.length > 0
							? rows
							: (
									<Table.Tr>
										<Table.Td colSpan={10}>
											<EmptyState
												title='Сделки не найдены'
												description='Попробуйте изменить параметры поиска или фильтры'
											/>
										</Table.Td>
									</Table.Tr>
								)}
					</Table.Tbody>
				</Table>
			</ScrollArea>

			{totalPages > 1 && (
				<ScrollArea>
					<Box p={{ base: 'xs', sm: 'md' }} w='max-content' mx='auto'>
						<Pagination total={totalPages} value={page} onChange={setPage} withEdges disabled={isFetching} />
					</Box>
				</ScrollArea>
			)}
		</>
	);
}

const TradesHistoryTableBoundary = withQueryBoundary(TradesHistoryTable, {
	suspenseProps: {
		fallback: <TradesHistorySkeleton />,
	},
});

export function TradesHistory() {
	const filters = useTradesHistoryFilters();

	return (
		<Section header={{ title: 'История сделок', actions: <AddTradeButton /> }}>
			<Card withBorder radius='md' p={0}>
				<FiltersGroup p={{ base: 'xs', sm: 'md' }} pb={{ base: 'xs', sm: 'sm' }} align='flex-end'>
					<SearchInput
						placeholder='Поиск...'
						value={filters.search}
						onChange={filters.handleSearch}
						miw={{ base: '100%', sm: 250 }}
						isLoading={filters.isFetching}
						disabled={filters.isFetching}
					/>
					<SegmentedControl
						data={[
							{ value: 'all', label: 'Все типы' },
							{ value: 'long', label: 'Long' },
							{ value: 'short', label: 'Short' },
						]}
						value={filters.typeFilter}
						onChange={(val) => filters.handleTypeFilter(val as any)}
						w={{ base: '100%', sm: 'auto' }}
						disabled={filters.isFetching}
					/>
					<SegmentedControl
						data={[
							{ value: 'all', label: 'Все статусы' },
							{ value: 'open', label: 'Открытые' },
							{ value: 'closed', label: 'Закрытые' },
						]}
						value={filters.statusFilter}
						onChange={(val) => filters.handleStatusFilter(val as any)}
						w={{ base: '100%', sm: 'auto' }}
						disabled={filters.isFetching}
					/>
				</FiltersGroup>

				<TradesHistoryTableBoundary
					search={filters.search}
					typeFilter={filters.typeFilter}
					statusFilter={filters.statusFilter}
					sortField={filters.sortField}
					sortDirection={filters.sortDirection}
					page={filters.page}
					isFetching={filters.isFetching}
					setSorting={filters.setSorting}
					setPage={filters.setPage}
				/>
			</Card>
		</Section>
	);
}

export const TradesHistoryBoundary = TradesHistory;
