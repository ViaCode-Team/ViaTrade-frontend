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
import { generatePath, Link as RouterLink } from 'react-router';

import type { SignalDirection } from '@/entities/signal';

import { ROUTES } from '@/shared/model';
import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useHistoryTable } from '../lib/use-history-table';
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
	const {
		setPage,
		rowsPerPage,
		handleRowsPerPageChange,
		history,
		paginatedHistory,
		totalPages,
		activePage,
		start,
		to,
	} = useHistoryTable({ strategyName, tradeCode });

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
											<AppEmptyState title='История пуста' description='Для этой акции еще не было сигналов.' />
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
						onChange={handleRowsPerPageChange}
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
