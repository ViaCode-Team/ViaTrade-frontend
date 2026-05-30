import { Stack } from '@mantine/core';

import type { Stock } from '@/entities/trade-code/stock';

import { RemindListBoundary, RemindStatusBarBoundary } from '@/features/remind/manage-reminds';
import { RemindsControls } from '@/features/remind/search-reminds';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

type StockRemindsProps = {
	stock: Stock;
};

function StockRemindsContent({ stock }: StockRemindsProps) {
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

export const StockReminds = withQueryBoundary(StockRemindsContent);
