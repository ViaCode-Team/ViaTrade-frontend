import { Stack } from '@mantine/core';

import { RemindList } from '@/features/remind/manage-reminds';
import { RemindsControls } from '@/features/remind/search-reminds';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { RemindsSummary } from './reminds-summary';

function RemindsOverviewContent() {
	return (
		<>
			<RemindsSummary />

			<Stack>
				<RemindsControls />
				<RemindList />
			</Stack>
		</>
	);
}

export const RemindsOverview = withQueryBoundary(RemindsOverviewContent);
