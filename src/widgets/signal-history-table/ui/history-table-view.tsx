import {
	Badge,
	Center,
	Flex,
	Group,
	MultiSelect,
	NumberFormatter,
	Pagination,
	Select,
	Table,
	Text,
} from '@mantine/core';
import { modals } from '@mantine/modals';
import { IconChevronRight } from '@tabler/icons-react';
import { generatePath, Link as RouterLink } from 'react-router';

import type { SignalDirection, TradeHistory } from '@/entities/signal';
import type { PaginationConfig } from '@/shared/model';

import { ROUTES } from '@/shared/model';
import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { InfoLabel } from '@/shared/ui/info-label';

import { CreateTradeFromSignalButton } from './create-trade-from-signal-button';
import cls from './history-table.module.css';

const ROWS_PER_PAGE_OPTIONS = ['5', '10', '25'];

type SignalHistoryTableViewProps = {
	strategyName: string;
	strategyDisplayName: string;
	rowsPerPage: number;
	history: TradeHistory[];
	totalCount: number;
	pagination?: PaginationConfig;
	start: number;
	to: number;
	handleRowsPerPageChange: (value: string | null) => void;
	selectedSignals: number[];
	handleSelectedSignalsChange: (val: string[]) => void;
};

export function SignalHistoryTableView({
	strategyName,
	strategyDisplayName,
	rowsPerPage,
	history,
	totalCount,
	pagination,
	start,
	to,
	handleRowsPerPageChange,
	selectedSignals,
	handleSelectedSignalsChange,
}: SignalHistoryTableViewProps) {
	return (
		<>
			<RouterLink to={generatePath(ROUTES.STRATEGY, { strategyName })} className={cls.strategyLink} onClick={() => modals.closeAll()}>
				<Text span size='sm' lineClamp={1}>{strategyDisplayName}</Text>
				<Flex flex='0 0 auto'><IconChevronRight size={16} /></Flex>
			</RouterLink>

			<MultiSelect
				mt='sm'
				label='Фильтр по типу сигнала'
				data={[
					{ value: '1', label: 'Покупать' },
					{ value: '-1', label: 'Продавать' },
					{ value: '0', label: 'Держать' },
				]}
				placeholder='Выберите типы'
				value={selectedSignals.map(String)}
				onChange={handleSelectedSignalsChange}
			/>

			<div className={cls.tableWrapper}>
				<Table highlightOnHover className={cls.table}>
					<Table.Thead>
						<Table.Tr>
							<Table.Th>Дата</Table.Th>
							<Table.Th className={cls.alignCenter}>
								<Center>
									<InfoLabel
										label='Закрытие'
										tooltipProps={{ text: 'Цена закрытия инструмента на дату формирования сигнала.' }}
									/>
								</Center>
							</Table.Th>
							<Table.Th className={cls.alignCenter}>Сигнал</Table.Th>
							<Table.Th className={cls.alignCenter}>Действие</Table.Th>
						</Table.Tr>
					</Table.Thead>
					<Table.Tbody>
						{history.length
							? history.map((row) => (
									<Table.Tr key={row.id} className={getRowClass(row.direction)}>
										<Table.Td>{row.date}</Table.Td>
										<Table.Td className={cls.alignCenter}><NumberFormatter value={row.close} suffix=' ₽' decimalScale={3} thousandSeparator='&#8201;' /></Table.Td>
										<Table.Td className={cls.alignCenter}>{getSignalBadge(row.direction)}</Table.Td>
										<Table.Td className={cls.alignCenter}>
											{row.direction !== 'hold' && (
												<CreateTradeFromSignalButton
													draft={{
														instrumentId: row.instrumentId,
														ticker: row.ticker,
														occurredAt: row.occurredAt,
														close: row.close,
														direction: row.direction,
													}}
												/>
											)}
										</Table.Td>
									</Table.Tr>
								))
							: (
									<Table.Tr><Table.Td colSpan={4}><AppEmptyState title='История пуста' description='Для этой акции еще не было сигналов.' /></Table.Td></Table.Tr>
								)}
					</Table.Tbody>
				</Table>
			</div>

			<Group mt='md' wrap='wrap' gap='sm' justify='center'>
				<Group gap='xs'>
					<Text size='sm' c='dimmed'>Строк на странице:</Text>
					<Select data={ROWS_PER_PAGE_OPTIONS} value={String(rowsPerPage)} onChange={handleRowsPerPageChange} size='xs' w={70} />
					<Text size='sm' c='dimmed'>
						{start}
						-
						{to}
						{' '}
						из
						{' '}
						{totalCount}
					</Text>
				</Group>

				{pagination && (
					<Pagination
						total={pagination.totalPages}
						value={pagination.page}
						onChange={pagination.onPageChange}
					/>
				)}
			</Group>
		</>
	);
}

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
