import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';

import {
	mapStrategyResultResponseToSignals,
	SignalsList,
	SignalsListSkeleton,
	useGetResultSuspense,
} from '@/entities/signal';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

export function DashboardSignalsWidget({ onSignalSelect }: { onSignalSelect: (signal: Signal) => void }) {
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

	return (
		<SignalsList
			signals={signals.slice(0, 4)}
			hasAnySignals={signals.length > 0}
			onSignalSelect={onSignalSelect}
		/>
	);
}

export const DashboardSignalsWidgetBoundary = withQueryBoundary(DashboardSignalsWidget, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
