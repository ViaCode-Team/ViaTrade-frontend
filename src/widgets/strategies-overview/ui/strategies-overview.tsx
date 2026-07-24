import { Stack } from '@mantine/core';

import { StrategiesControls } from './strategies-controls';
import { StrategiesOverviewListBoundary } from './strategies-overview-list';

export function StrategiesOverview() {
	return (
		<Stack>
			<StrategiesControls />

			<StrategiesOverviewListBoundary />
		</Stack>
	);
}
