import { Skeleton } from '@mantine/core';

import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { useRemindList } from '../lib/use-remind-list';

export function RemindStatusBar({ instrumentId }: { instrumentId?: number }) {
	const { reminds, filteredReminds } = useRemindList(instrumentId);

	return (
		<ListStatusBar
			totalCount={reminds.length}
			filteredCount={filteredReminds.length}
		/>
	);
}

export const RemindStatusBarBoundary = withQueryBoundary(RemindStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
