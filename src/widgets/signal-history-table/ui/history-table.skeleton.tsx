import { Skeleton, Stack } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';

export function SignalHistoryTableSkeleton() {
	return (
		<Stack gap='xs'>
			{createSkeletons(5).map((item) => (
				<Skeleton key={item.id} h={38} />
			))}
		</Stack>
	);
}
