import { useMemo } from 'react';

import {
	mapStrategyResultResponseToSignals,
	useGetResultSuspense,
} from '@/entities/signal';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

import { getSignalResultsMock } from '../api/signal-results.mock';

function SignalsSummary() {
	const { data: signalsData } = useGetResultSuspense(undefined, {
		query: {
			queryFn: getSignalResultsMock,
			staleTime: Infinity,
		},
	});

	const signals = useMemo(
		() => mapStrategyResultResponseToSignals(signalsData.data),
		[signalsData.data],
	);

	const total = signals.length;
	const buy = signals.filter((s) => s.direction === 'buy').length;
	const sell = signals.filter((s) => s.direction === 'sell').length;

	return (
		<SummaryList>
			<SummaryCard title='Всего' value={total} />
			<SummaryCard title='Покупка' value={buy} color='green' />
			<SummaryCard title='Продажа' value={sell} color='red' />
		</SummaryList>
	);
}

export const SignalsSummaryBoundary = withQueryBoundary(SignalsSummary, {
	suspenseProps: {
		fallback: null,
	},
});
