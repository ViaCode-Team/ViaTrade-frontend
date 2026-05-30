import { Badge, Group, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';

import { CloseTradeButton } from '@/features/statistic/close-trade';
import { DeleteTradeButton } from '@/features/statistic/delete-trade';
import { EditTradeButton } from '@/features/statistic/edit-trade';

import type { ProcessedTrade } from '../lib/use-trades-history';

export type TradesHistoryTableRowProps = {
	trade: ProcessedTrade;
};

export function TradesHistoryTableRow({ trade }: TradesHistoryTableRowProps) {
	const isWin = trade.percent > 0;
	const isLoss = trade.percent < 0;

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
				<Text fw={500}>{trade.income.toFixed(2)}</Text>
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
}
