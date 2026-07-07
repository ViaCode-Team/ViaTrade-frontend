import { Stack } from '@mantine/core';

import { StrategiesControls } from './strategies-controls';
import { StrategiesOverviewListBoundary } from './strategies-overview-list';
import { StrategiesStatusBarBoundary } from './strategies-status-bar';

export function StrategiesOverview() {
	return (
		<Stack>
			<Stack gap='xs'>
				<StrategiesControls />

				<StrategiesStatusBarBoundary />
			</Stack>

			<StrategiesOverviewListBoundary />
		</Stack>
	);
}
