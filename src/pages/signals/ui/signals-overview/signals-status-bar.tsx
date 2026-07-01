import {
	Skeleton,
} from '@mantine/core';
import { useMemo } from 'react';

import {
	mapStrategyResultResponseToSignals,
	useGetResultSuspense,
} from '@/entities/signal';
import { getFilteredSignals } from '@/pages/signals/ui/filter-signals';
import { useSignalsControls } from '@/pages/signals/ui/filter-signals';
import {
	QUERY_REFETCH_INTERVAL,
	QUERY_REFETCH_INTERVAL_TEXT,
	STATIC_QUERY_STALE_TIME,
} from '@/shared/model';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

export function SignalsStatusBar() {
	const { filters } = useSignalsControls();
	const { data: signalsData, refetch } = useGetResultSuspense(undefined, {
		query: {
			staleTime: STATIC_QUERY_STALE_TIME,
			refetchInterval: QUERY_REFETCH_INTERVAL,
		},
	});
	const signals = useMemo(
		() => mapStrategyResultResponseToSignals(signalsData.data),
		[signalsData.data],
	);
	const filteredAndSortedSignals = useMemo(() => {
		return getFilteredSignals(signals, filters);
	}, [signals, filters]);

	const totalCount = signals.length;
	const filteredCount = filteredAndSortedSignals.length;
	const buyCount = filteredAndSortedSignals.filter((s) => s.direction === 'buy').length;
	const sellCount = filteredAndSortedSignals.filter((s) => s.direction === 'sell').length;

	return (
		<ListStatusBar
			totalCount={totalCount}
			filteredCount={filteredCount}
			refreshIntervalText={QUERY_REFETCH_INTERVAL_TEXT}
			onRefresh={refetch}
			badges={(
				<>
					<ValueBadge variant='dot' color='green' size='sm' label='Покупать' value={buyCount} />
					<ValueBadge variant='dot' color='red' size='sm' label='Продавать' value={sellCount} />
				</>
			)}
		/>
	);
}

export const SignalsStatusBarBoundary = withQueryBoundary(SignalsStatusBar, {
	suspenseProps: {
		fallback: <Skeleton height={40} />,
	},
});
