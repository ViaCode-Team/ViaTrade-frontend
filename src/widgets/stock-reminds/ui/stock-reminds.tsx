import { Stack } from '@mantine/core';

import type { Stock } from '@/entities/trade-code/stock';

import { RemindListBoundary } from '@/features/remind/manage-reminds';
import { RemindsControls } from '@/features/remind/search-reminds';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

type StockRemindsProps = {
	stock: Stock;
};

function StockRemindsContent({ stock }: StockRemindsProps) {
	return (
		<Stack>
			<RemindsControls instrumentId={stock.instrumentId} />
			<RemindListBoundary hideSourceBadge instrumentId={stock.instrumentId} />
		</Stack>
	);
}

export const StockReminds = withQueryBoundary(StockRemindsContent);
