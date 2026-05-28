import { Skeleton, Stack } from '@mantine/core';

export function TradesHistorySkeleton() {
	return (
		<Stack gap='md' mt='xl'>
			<Skeleton height={30} width={200} />
			<Skeleton height={400} radius='md' />
		</Stack>
	);
}
