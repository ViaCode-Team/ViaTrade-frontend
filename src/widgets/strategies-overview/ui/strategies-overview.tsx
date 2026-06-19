import { Stack } from '@mantine/core';

import { StrategiesControls } from '@/widgets/strategies-overview/ui/filter-strategies';

import { StrategiesOverviewListBoundary } from './strategies-overview-list';
import { StrategiesStatusBarBoundary } from './strategies-status-bar';

export function StrategiesOverview() {
	return (
		<Stack gap='md'>
			<Stack gap='xs'>
				<StrategiesControls />

				<StrategiesStatusBarBoundary />
			</Stack>

			<StrategiesOverviewListBoundary />
		</Stack>
	);
}
