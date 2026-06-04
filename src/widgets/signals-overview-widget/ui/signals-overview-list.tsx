import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';
import type { SignalFilters } from '@/features/signal/filter-signals';

import {
	mapStrategyResultResponseToSignals,
	SignalsList,
	SignalsListSkeleton,
	useGetResultSuspense,
} from '@/entities/signal';
import { getFilteredSignals } from '@/features/signal/filter-signals';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

export type SignalsOverviewListProps = {
	filters: SignalFilters;
	onSignalSelect: (signal: Signal) => void;
};

function SignalsOverviewList({ filters, onSignalSelect }: SignalsOverviewListProps) {
	const { data: signalsData } = useGetResultSuspense(undefined, {
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
		const filtered = filters ? getFilteredSignals(signals, filters) : signals;
		return filtered;
	}, [signals, filters]);

	return (
		<SignalsList
			signals={filteredAndSortedSignals}
			hasAnySignals={signals.length > 0}
			onSignalSelect={onSignalSelect}
		/>
	);
}

export const SignalsOverviewListBoundary = withQueryBoundary(SignalsOverviewList, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
