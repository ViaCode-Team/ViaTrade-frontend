import { Skeleton, Stack } from '@mantine/core';

export function StrategyPageSkeleton() {
	return (
		<Stack gap='sm'>
			<Skeleton h={34} w={180} />
			<Skeleton h={22} maw={420} />
			<Skeleton h={180} mt='lg' />
		</Stack>
	);
}
