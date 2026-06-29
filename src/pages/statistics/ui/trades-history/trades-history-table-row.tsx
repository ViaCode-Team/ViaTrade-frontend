import { Badge, Group, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';

import { CloseTradeButton } from '@/pages/statistics/ui/close-statistic';
import { DeleteTradeButton } from '@/pages/statistics/ui/delete-statistic';
import { EditTradeButton } from '@/pages/statistics/ui/edit-statistic';
import { DATE_TIME_DISPLAY_FORMAT } from '@/shared/model';

import type { ProcessedTrade } from './use-trades-history-table';

export type TradesHistoryTableRowProps = {
	trade: ProcessedTrade;
};

export function TradesHistoryTableRow({ trade }: TradesHistoryTableRowProps) {
	const isWin = trade.percent ? trade.percent > 0 : false;
	const isLoss = trade.percent ? trade.percent < 0 : false;

	return (
		<Table.Tr>
			<Table.Td>
				<Text size='sm' fw={500}>{trade.ticker}</Text>
				<Text size='xs' c='dimmed'>
					{trade.tradeTypeId === 1 ? 'Акция' : trade.tradeTypeId === 2 ? 'Фьючерс' : null}
				</Text>
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
			<Table.Td>{dayjs(trade.dateOpen).format(DATE_TIME_DISPLAY_FORMAT)}</Table.Td>
			<Table.Td>{trade.dateClose ? dayjs(trade.dateClose).format(DATE_TIME_DISPLAY_FORMAT) : '—'}</Table.Td>
			<Table.Td style={{ whiteSpace: 'nowrap' }}>
				{trade.tradeOpen.toFixed(2)}
				{' '}
				₽
			</Table.Td>
			<Table.Td style={{ whiteSpace: 'nowrap' }}>{trade.tradeClose ? `${trade.tradeClose.toFixed(2)} ₽` : '—'}</Table.Td>
			<Table.Td style={{ whiteSpace: 'nowrap' }}>{trade.count}</Table.Td>
			<Table.Td style={{ whiteSpace: 'nowrap' }}>
				<Text fw={500}>
					{trade.income.toFixed(2)}
					{' '}
					₽
				</Text>
			</Table.Td>
			<Table.Td style={{ whiteSpace: 'nowrap' }}>
				{trade.percent !== undefined
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
}
