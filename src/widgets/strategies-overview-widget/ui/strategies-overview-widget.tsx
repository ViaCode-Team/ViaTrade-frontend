import { Stack } from '@mantine/core';

import { StrategiesControls } from '@/features/strategy/filter-strategies';

import { StrategiesOverviewListBoundary } from './strategies-overview-list';
import { StrategiesStatusBarBoundary } from './strategies-status-bar';

export function StrategiesOverviewWidget() {
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
