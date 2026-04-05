import {
	Badge,
	Group,
	Modal,
	NativeSelect,
	Pagination,
	Table,
	Text,
	Title,
} from '@mantine/core';
import { IconChartLine, IconTrendingDown, IconTrendingUp } from '@tabler/icons-react';
import { useState } from 'react';

import { generateMockHistory } from '@/entities/signal';

import classes from './history-table.module.css';

type HistoryTableProps = {
	asset: string;
	onClose: () => void;
};

const ROWS_PER_PAGE_OPTIONS = ['5', '10', '25'];

export function HistoryTable({ asset, onClose }: HistoryTableProps) {
	const [page, setPage] = useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(5);
	const history = generateMockHistory(asset);

	const totalPages = Math.ceil(history.length / rowsPerPage);
	const from = (page - 1) * rowsPerPage;
	const to = Math.min(page * rowsPerPage, history.length);
	const paginatedHistory = history.slice(from, to);

	function getSignalBadge(signal: 'buy' | 'sell' | 'hold') {
		if (signal === 'buy')
			return <Badge color='green' size='sm' leftSection={<IconTrendingUp size={12} />}>Buy</Badge>;
		if (signal === 'sell')
			return <Badge color='red' size='sm' leftSection={<IconTrendingDown size={12} />}>Sell</Badge>;
		return <Badge color='gray' size='sm'>Hold</Badge>;
	}

	function getProfitColor(profit: number | undefined) {
		if (profit && profit > 0)
			return 'var(--mantine-color-green-6)';
		if (profit && profit < 0)
			return 'var(--mantine-color-red-6)';
		return undefined;
	}

	function getRowBg(profit: number | undefined) {
		if (profit && profit > 0)
			return 'var(--mantine-color-green-light)';
		if (profit && profit < 0)
			return 'var(--mantine-color-red-light)';
		return undefined;
	}

	return (
		<Modal
			opened
			onClose={onClose}
			size='xl'
			title={(
				<Group gap='xs'>
					<IconChartLine size={20} />
					<Title order={4}>
						История торгов:
						{' '}
						{asset}
					</Title>
				</Group>
			)}
		>
			<div className={classes.tableWrapper}>
				<Table striped highlightOnHover>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Дата</Table.Th>
							<Table.Th className={classes.alignRight}>Открытие</Table.Th>
							<Table.Th className={classes.alignRight}>Максимум</Table.Th>
							<Table.Th className={classes.alignRight}>Минимум</Table.Th>
							<Table.Th className={classes.alignRight}>Закрытие</Table.Th>
							<Table.Th className={classes.alignRight}>Объём</Table.Th>
							<Table.Th className={classes.alignCenter}>Сигнал</Table.Th>
							<Table.Th className={classes.alignRight}>Прибыль</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{paginatedHistory.map((row) => (
							<Table.Tr key={row.id} style={{ backgroundColor: getRowBg(row.profit) }}>
								<Table.Td>{row.date}</Table.Td>
								<Table.Td className={classes.alignRight}>
									$
									{row.open.toFixed(2)}
								</Table.Td>
								<Table.Td className={classes.alignRight} style={{ color: 'var(--mantine-color-green-6)' }}>
									$
									{row.high.toFixed(2)}
								</Table.Td>
								<Table.Td className={classes.alignRight} style={{ color: 'var(--mantine-color-red-6)' }}>
									$
									{row.low.toFixed(2)}
								</Table.Td>
								<Table.Td className={classes.alignRight}>
									$
									{row.close.toFixed(2)}
								</Table.Td>
								<Table.Td className={classes.alignRight}>{row.volume.toLocaleString()}</Table.Td>
								<Table.Td className={classes.alignCenter}>
									{getSignalBadge(row.signal)}
								</Table.Td>
								<Table.Td className={classes.alignRight} style={{ color: getProfitColor(row.profit), fontWeight: 'bold' }}>
									{row.profit ? `$${row.profit.toFixed(2)}` : '—'}
								</Table.Td>
							</Table.Tr>
						))}
					</Table.Tbody>
				</Table>
			</div>

			<Group justify='space-between' mt='md'>
				<Group gap='xs'>
					<Text size='sm' c='dimmed'>Строк на странице:</Text>
					<NativeSelect
						data={ROWS_PER_PAGE_OPTIONS}
						value={String(rowsPerPage)}
						onChange={(e) => {
							setRowsPerPage(Number(e.currentTarget.value));
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
						{history.length}
					</Text>
				</Group>
				<Pagination
					total={totalPages}
					value={page}
					onChange={setPage}
					size='sm'
				/>
			</Group>
		</Modal>
	);
}
