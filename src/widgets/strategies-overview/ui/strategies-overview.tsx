import { Stack } from '@mantine/core';

import { StrategiesControls } from '@/features/strategy/filter-strategies';

import { StrategiesListBoundary } from './strategies-list';
import { StrategiesStatusBarBoundary } from './strategies-status-bar';

export function StrategiesOverview() {
	return (
		<Stack gap='md'>
			<Stack gap='xs'>
				<StrategiesControls />

				<StrategiesStatusBarBoundary />
			</Stack>

			<StrategiesListBoundary />
		</Stack>
	);
}
