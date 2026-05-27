import { Stack } from '@mantine/core';

import { StrategiesSearch } from '@/features/strategy/search-strategies';

import { StrategiesListBoundary } from './strategies-list';

export function StrategiesOverview() {
	return (
		<Stack gap='md'>
			<StrategiesSearch />
			<StrategiesListBoundary />
		</Stack>
	);
}
