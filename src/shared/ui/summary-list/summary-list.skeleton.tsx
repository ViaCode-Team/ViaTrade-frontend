import { createSkeletons } from '@/shared/lib/skeleton';

import { SummaryCardSkeleton } from '../summary-card';
import { SummaryList } from './summary-list';

export type SummaryListSkeletonProps = {
	count?: number;
};

export function SummaryListSkeleton({ count = 3 }: SummaryListSkeletonProps) {
	const skeletons = createSkeletons(count);

	return (
		<SummaryList>
			{skeletons.map((skeleton) => (
				<SummaryCardSkeleton key={skeleton.id} />
			))}
		</SummaryList>
	);
}
