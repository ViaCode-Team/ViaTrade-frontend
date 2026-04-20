import {
	Badge,
	Group,
	Modal,
	Pagination,
	Select,
	Table,
	Text,
	Title,
} from '@mantine/core';
import { useMemo, useState } from 'react';

import { generateMockHistory } from '@/entities/signal';

import cls from './history-table.module.css';

type HistoryTableProps = {
	asset: string;
	strategy: string;
	onClose: () => void;
};

const ROWS_PER_PAGE_OPTIONS = ['5', '10', '25'];

export function HistoryTable({ asset, strategy, onClose }: HistoryTableProps) {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const history = useMemo(
		() => generateMockHistory(asset).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
		[asset],
	);

	const totalPages = Math.ceil(history.length / rowsPerPage);
	const from = (page - 1) * rowsPerPage;
	const to = Math.min(page * rowsPerPage, history.length);
	const paginatedHistory = history.slice(from, to);

	function getSignalBadge(signal: 'buy' | 'sell' | 'hold') {
		if (signal === 'buy')
			return <Badge classNames={{ label: cls.badgeLabel }} color='green' size='sm'>Покупать</Badge>;
		if (signal === 'sell')
			return <Badge classNames={{ label: cls.badgeLabel }} color='red' size='sm'>Продавать</Badge>;
		return <Badge classNames={{ label: cls.badgeLabel }} color='gray' size='sm'>Держать</Badge>;
	}

	function getRowClass(signal: 'buy' | 'sell' | 'hold') {
		if (signal === 'buy')
			return cls.rowBuy;
		if (signal === 'sell')
			return cls.rowSell;
		return cls.rowHold;
	}

	return (
		<Modal
			opened
			onClose={onClose}
			size='md'
			title={(
				<>
					<Title order={5}>
						История сигнала:
						{' '}
						{asset}
					</Title>

					<Text size='sm' c='dimmed'>
						{strategy}
					</Text>
				</>
			)}
		>
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

						{paginatedHistory.map((row) => (
							<Table.Tr key={row.id} className={getRowClass(row.signal)}>
								<Table.Td>{row.date}</Table.Td>
								<Table.Td className={cls.alignCenter}>
									$
									{row.close.toFixed(2)}
								</Table.Td>
								<Table.Td className={cls.alignCenter}>
									{getSignalBadge(row.signal)}
								</Table.Td>
							</Table.Tr>
						))}
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
						{from + 1}
						-
						{to}
						{' '}
						из
						{' '}
						{history.length}
					</Text>
				</Group>

				<Pagination
					total={totalPages}
					value={page}
					onChange={setPage}
					withEdges
					size='sm'
				/>
			</Group>
		</Modal>
	);
}
