import { SimpleGrid } from '@mantine/core';

import { TelegramServiceBoundary } from './telegram-service';

export function ThirdPartyService() {
	return (
		<SimpleGrid minColWidth={300} spacing='sm' autoFlow='auto-fit'>
			<TelegramServiceBoundary />
		</SimpleGrid>
	);
}
