import { Card, Stack } from '@mantine/core';

import { TradesHistoryControls } from '@/features/trade/filter-trades';

import { TradesHistoryTableBoundary } from './trades-history-table';

export function TradesHistory() {
	return (
		<Card withBorder radius='md' p={{ base: 'xs', sm: 'md' }}>
			<Stack gap='xs'>
				<TradesHistoryControls />

				<TradesHistoryTableBoundary />
			</Stack>
		</Card>
	);
}
