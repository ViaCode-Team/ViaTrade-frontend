import {
	Skeleton,
} from '@mantine/core';
import { useMemo } from 'react';

import {
	mapStrategyResultResponseToSignals,
	useGetResultSuspense,
} from '@/entities/signal';
import { getFilteredSignals } from '@/features/signal/filter-signals';
import { useSignalsControls } from '@/features/signal/filter-signals';
import { ListStatusBar } from '@/shared/ui/list-status-bar';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { ValueBadge } from '@/shared/ui/value-badge';

export function SignalsStatusBar() {
	const { filters } = useSignalsControls();
	const { data: signalsData, refetch } = useGetResultSuspense(undefined, {
		query: {
			staleTime: Infinity,
			refetchInterval: 300000,
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
			refreshIntervalText='Автообновление: 5 мин'
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
		fallback: <Skeleton height={40} radius='md' />,
	},
});
