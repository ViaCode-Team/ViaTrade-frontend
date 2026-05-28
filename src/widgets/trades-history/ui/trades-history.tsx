import {
	Badge,
	Card,
	Group,
	ScrollArea,
	Table,
	Text,
} from '@mantine/core';
import dayjs from 'dayjs';

import { useGetByUserSuspense } from '@/entities/statistic/api/gen';
import { useGetAllStocksCodesSuspense } from '@/entities/trade-code/api/gen';
import { AddTradeButton } from '@/features/statistic/add-trade';
import { CloseTradeButton } from '@/features/statistic/close-trade';
import { DeleteTradeButton } from '@/features/statistic/delete-trade';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { Section } from '@/shared/ui/section';

import { TradesHistorySkeleton } from './trades-history.skeleton';

export function TradesHistory() {
	const { data: tradesResponse } = useGetByUserSuspense();
	const { data: stocksResponse } = useGetAllStocksCodesSuspense();

	const trades = tradesResponse.data;
	const stocks = stocksResponse.data;

	if (trades.length === 0) {
		return null;
	}

	const sortedTrades = [...trades].sort(
		(a, b) => dayjs(b.dateOpen).valueOf() - dayjs(a.dateOpen).valueOf(),
	);

	const rows = sortedTrades.map((trade) => {
		const stock = stocks.find((s) => s.id === trade.tradeCodeId);
		const ticker = stock?.exchangeId || 'Unknown';
		const isLong = trade.tradeTypeId === 1;

		const income = trade.netIncome ?? 0;
		const isWin = income > 0;
		const isLoss = income < 0;

		return (
			<Table.Tr key={trade.id}>
				<Table.Td>
					<Text size='sm' fw={500}>{ticker}</Text>
				</Table.Td>
				<Table.Td>
					<Badge color={isLong ? 'blue' : 'orange'} variant='light'>
						{isLong ? 'Long' : 'Short'}
					</Badge>
				</Table.Td>
				<Table.Td>{dayjs(trade.dateOpen).format('DD.MM.YYYY HH:mm')}</Table.Td>
				<Table.Td>{trade.dateClose ? dayjs(trade.dateClose).format('DD.MM.YYYY HH:mm') : '—'}</Table.Td>
				<Table.Td>
					{trade.tradeOpen.toFixed(2)}
					{' '}
					₽
				</Table.Td>
				<Table.Td>{trade.tradeClose ? `${trade.tradeClose.toFixed(2)} ₽` : '—'}</Table.Td>
				<Table.Td>{trade.count}</Table.Td>
				<Table.Td>
					{trade.netIncome !== undefined && trade.netIncome !== null
						? (
								<Text c={isWin ? 'teal' : isLoss ? 'red' : 'dimmed'} fw={500}>
									{income > 0 ? '+' : ''}
									{income.toFixed(2)}
									{' '}
									₽
								</Text>
							)
						: (
								<Text c='dimmed'>—</Text>
							)}
				</Table.Td>
				<Table.Td>
					<Group gap='xs' wrap='nowrap' justify='flex-end' align='center'>
						{!trade.dateClose && <CloseTradeButton trade={trade} />}
						<DeleteTradeButton trade={trade} />
					</Group>
				</Table.Td>
			</Table.Tr>
		);
	});

	return (
		<Section header={{ title: 'История сделок', actions: <AddTradeButton /> }}>
			<Card withBorder radius='md' p={0}>
				<ScrollArea>
					<Table verticalSpacing='sm' striped highlightOnHover>
						<Table.Thead>
							<Table.Tr>
								<Table.Th>Тикер</Table.Th>
								<Table.Th>Тип</Table.Th>
								<Table.Th>Открытие</Table.Th>
								<Table.Th>Закрытие</Table.Th>
								<Table.Th>Цена откр.</Table.Th>
								<Table.Th>Цена закр.</Table.Th>
								<Table.Th>Кол-во</Table.Th>
								<Table.Th>PnL</Table.Th>
								<Table.Th />
							</Table.Tr>
						</Table.Thead>
						<Table.Tbody>{rows}</Table.Tbody>
					</Table>
				</ScrollArea>
			</Card>
		</Section>
	);
}

export const TradesHistoryBoundary = withQueryBoundary(TradesHistory, {
	suspenseProps: {
		fallback: <TradesHistorySkeleton />,
	},
});
