import { Stack } from '@mantine/core';

import type { Stock } from '@/entities/stock';

import { RemindProvider } from '@/entities/remind';
import { RemindList } from '@/features/remind/manage-reminds';
import { RemindsControls } from '@/features/remind/search-reminds';

type StockRemindsProps = {
	stock: Stock;
};

export function StockReminds({ stock }: StockRemindsProps) {
	return (
		<RemindProvider source={{ type: 'stock', id: stock.id.toString(), label: stock.name }}>
			<Stack>
				<RemindsControls />
				<RemindList hideSourceBadge />
			</Stack>
		</RemindProvider>
	);
}
