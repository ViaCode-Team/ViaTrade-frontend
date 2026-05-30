import { Stack } from '@mantine/core';

import type { Stock } from '@/entities/trade-code/stock';

import { RemindsControls } from '@/features/remind/filter-reminds';
import { RemindListBoundary, RemindStatusBarBoundary } from '@/features/remind/manage-reminds';

type StockRemindsProps = {
	stock: Stock;
};

export function StockReminds({ stock }: StockRemindsProps) {
	return (
		<Stack>
			<Stack gap='xs'>
				<RemindsControls instrumentId={stock.instrumentId} />
				<RemindStatusBarBoundary instrumentId={stock.instrumentId} />
			</Stack>
			<RemindListBoundary hideSourceBadge instrumentId={stock.instrumentId} />
		</Stack>
	);
}
