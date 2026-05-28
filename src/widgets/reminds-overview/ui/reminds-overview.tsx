import { Stack } from '@mantine/core';

import { RemindListBoundary } from '@/features/remind/manage-reminds';
import { RemindsControls } from '@/features/remind/search-reminds';

import { RemindsSummaryBoundary } from './reminds-summary';

export function RemindsOverview() {
	return (
		<>
			<RemindsSummaryBoundary />

			<Stack>
				<RemindsControls />
				<RemindListBoundary />
			</Stack>
		</>
	);
}
