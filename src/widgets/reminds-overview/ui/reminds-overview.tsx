import { Stack } from '@mantine/core';

import { RemindProvider } from '@/entities/remind';
import { RemindsControls } from '@/features/remind/search-reminds';

import { RemindList } from './remind-list';
import { RemindsSummary } from './reminds-summary';

export function RemindsOverview() {
	return (
		<RemindProvider>
			<RemindsSummary />

			<Stack gap='md' mt='md'>
				<RemindsControls />
				<RemindList />
			</Stack>
		</RemindProvider>
	);
}
