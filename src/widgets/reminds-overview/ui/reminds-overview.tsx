import { Stack } from '@mantine/core';

import { RemindsControls } from '@/features/remind/filter-reminds';
import { RemindListBoundary, RemindStatusBarBoundary } from '@/features/remind/manage-reminds';

import { RemindsSummaryBoundary } from './reminds-summary';

export function RemindsOverview() {
	return (
		<>
			<RemindsSummaryBoundary />

			<Stack>
				<Stack gap='xs'>
					<RemindsControls />
					<RemindStatusBarBoundary />
				</Stack>
				<RemindListBoundary />
			</Stack>
		</>
	);
}
