import { Stack } from '@mantine/core';

import { StrategiesSearch } from '@/features/strategy/search-strategies';

import { StrategiesListBoundary } from './strategies-list';
import { StrategiesStatusBarBoundary } from './strategies-status-bar';

export function StrategiesOverview() {
	return (
		<Stack gap='md'>
			<Stack gap='xs'>
				<StrategiesSearch />

				<StrategiesStatusBarBoundary />
			</Stack>

			<StrategiesListBoundary />
		</Stack>
	);
}
