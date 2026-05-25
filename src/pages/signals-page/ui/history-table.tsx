import {
	Badge,
	Flex,
	Group,
	NumberFormatter,
	Pagination,
	Select,
	Table,
	Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconChevronRight } from '@tabler/icons-react';
import { useMemo, useState } from 'react';
import { generatePath, Link as RouterLink } from 'react-router';

import type { SignalDirection } from '@/entities/signal';

import {
	mapStrategyResultResponseToTradeHistory,
	useGetResultByStrategyAndTradeCodeSuspense,
} from '@/entities/signal';
import { ROUTES } from '@/shared/model/routes';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getSignalHistoryMock } from '../api/signal-results.mock';
import cls from './history-table.module.css';
import { HistoryTableSkeleton } from './history-table.skeleton';

type HistoryTableProps = {
	tradeCode: string;
	strategyName: string;
};

const ROWS_PER_PAGE_OPTIONS = ['5', '10', '25'];

export function HistoryTable({
	tradeCode,
	strategyName,
}: HistoryTableProps) {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const { data: historyData } = useGetResultByStrategyAndTradeCodeSuspense(
		strategyName,
		tradeCode,
		undefined,
		{
			query: {
				queryFn: () => getSignalHistoryMock(strategyName, tradeCode),
				staleTime: Infinity,
			},
		},
	);
	const history = useMemo(
		() => mapStrategyResultResponseToTradeHistory(
			historyData.data,
			strategyName,
			tradeCode,
		),
		[historyData.data, strategyName, tradeCode],
	);

	const totalPages = Math.max(1, Math.ceil(history.length / rowsPerPage));
	const activePage = Math.min(page, totalPages);
	const from = (activePage - 1) * rowsPerPage;
	const to = Math.min(activePage * rowsPerPage, history.length);
	const start = history.length === 0 ? 0 : from + 1;
	const paginatedHistory = history.slice(from, to);

	function getSignalBadge(signal: SignalDirection) {
		if (signal === 'buy')
			return <Badge classNames={{ label: cls.badgeLabel }} color='green' size='sm'>Покупать</Badge>;
		if (signal === 'sell')
			return <Badge classNames={{ label: cls.badgeLabel }} color='red' size='sm'>Продавать</Badge>;
		return <Badge classNames={{ label: cls.badgeLabel }} color='gray' size='sm'>Держать</Badge>;
	}

	function getRowClass(signal: SignalDirection) {
		if (signal === 'buy')
			return cls.rowBuy;
		if (signal === 'sell')
			return cls.rowSell;
		return cls.rowHold;
	}

	return (
		<>
			<RouterLink
				to={generatePath(ROUTES.STRATEGY, { strategyName })}
				className={cls.strategyLink}
				onClick={() => modals.closeAll()}
			>
				<Text span size='sm' lineClamp={1}>
					{strategyName}
				</Text>

				<Flex flex='0 0 auto'>
					<IconChevronRight size={16} />
				</Flex>
			</RouterLink>

			<div className={cls.tableWrapper}>
				<Table highlightOnHover className={cls.table}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Дата</Table.Th>
							<Table.Th className={cls.alignCenter}>Закрытие</Table.Th>
							<Table.Th className={cls.alignCenter}>Сигнал</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{history.length === 0
							? (
									<Table.Tr>
										<Table.Td colSpan={3}>
											<EmptyState title='История сигналов пуста' />
										</Table.Td>
									</Table.Tr>
								)
							: (
									paginatedHistory.map((row) => (
										<Table.Tr key={row.id} className={getRowClass(row.signal)}>
											<Table.Td>{row.date}</Table.Td>
											<Table.Td className={cls.alignCenter}>
												<NumberFormatter value={row.close} suffix=' ₽' decimalScale={3} thousandSeparator='&#8201;' />
											</Table.Td>
											<Table.Td className={cls.alignCenter}>
												{getSignalBadge(row.signal)}
											</Table.Td>
										</Table.Tr>
									))
								)}
					</Table.Tbody>
				</Table>
			</div>

			<Group mt='md' wrap='wrap' gap='sm' justify='center'>
				<Group gap='xs'>
					<Text size='sm' c='dimmed'>Строк на странице:</Text>
					<Select
						data={ROWS_PER_PAGE_OPTIONS}
						value={String(rowsPerPage)}
						onChange={(v) => {
							setRowsPerPage(Number(v));
							setPage(1);
						}}
						size='xs'
						w={70}
					/>
					<Text size='sm' c='dimmed'>
						{start}
						-
						{to}
						{' '}
						из
						{' '}
						{history.length}
					</Text>
				</Group>

				{totalPages > 1 && (
					<Pagination
						total={totalPages}
						value={activePage}
						onChange={setPage}
						withEdges
						size='sm'
					/>
				)}
			</Group>
		</>
	);
}

export const HistoryTableBoundary = withQueryBoundary(HistoryTable, {
	suspenseProps: {
		fallback: <HistoryTableSkeleton />,
	},
});
