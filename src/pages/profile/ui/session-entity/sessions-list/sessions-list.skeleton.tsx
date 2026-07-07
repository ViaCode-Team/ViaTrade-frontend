import { Skeleton, Stack } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/ui-helpers';

export function SessionsListSkeleton() {
	return (
		<Stack component='ul' gap='xs'>
			{createSkeletons(3).map((item) => (
				<Skeleton key={item.id} component='li' h={75} />
			))}
		</Stack>
	);
}
