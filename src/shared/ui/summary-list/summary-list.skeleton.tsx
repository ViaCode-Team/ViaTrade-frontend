import { Skeleton } from '@mantine/core';

import { SummaryList } from './summary-list';

export type SummaryListSkeletonProps = {
	count?: number;
};

export function SummaryListSkeleton({ count = 3 }: SummaryListSkeletonProps) {
	return (
		<SummaryList>
			{Array.from({ length: count }).map((_, index) => (
				<Skeleton key={index} height={90} radius='md' />
			))}
		</SummaryList>
	);
}
