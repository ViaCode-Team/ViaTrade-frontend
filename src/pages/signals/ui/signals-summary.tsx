import { useMemo } from 'react';

import {
	mapStrategyResultResponseToSignals,
	useGetResultSuspense,
} from '@/entities/signal';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';
import { SummaryCard } from '@/shared/ui/summary-card';
import { SummaryList } from '@/shared/ui/summary-list';

function SignalsSummary() {
	const { data: signalsData } = useGetResultSuspense(undefined, {
		query: {
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
			<SummaryCard title='Покупать' value={buy} color='green' />
			<SummaryCard title='Продавать' value={sell} color='red' />
		</SummaryList>
	);
}

export const SignalsSummaryBoundary = withQueryBoundary(SignalsSummary, {
	suspenseProps: {
		fallback: (
			<SummaryList>
				<SummaryCard title='Всего' isLoading />
				<SummaryCard title='Покупать' isLoading color='green' />
				<SummaryCard title='Продавать' isLoading color='red' />
			</SummaryList>
		),
	},
});
