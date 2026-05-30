import { SimpleGrid } from '@mantine/core';
import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';

import {
	mapStrategyResultResponseToSignals,
	SignalCard,
	useGetResultSuspense,
} from '@/entities/signal';
import { getFilteredSignals, type SignalFilters } from '@/features/signal/filter-signals';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { SignalsListSkeleton } from './signals-list.skeleton';

type SignalsListProps = {
	filters?: SignalFilters;
	limit?: number;
	onSignalSelect: (signal: Signal) => void;
};

export function SignalsList({
	filters,
	limit,
	onSignalSelect,
}: SignalsListProps) {
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
		return limit ? filtered.slice(0, limit) : filtered;
	}, [signals, filters, limit]);

	if (signals.length === 0) {
		return <EmptyState title='Сигналы отсутствуют' description='Привяжите акции к стратегии, чтобы начать получать сигналы.' />;
	}

	if (filteredAndSortedSignals.length === 0) {
		return (
			<EmptyState
				title='Ничего не найдено'
				description='Измените параметры поиска или сбросьте фильтры.'
			/>
		);
	}

	return (
		<SimpleGrid
			minColWidth={300}
			spacing={CONTENT_GRID_SPACING}
			component='ul'
		>
			{filteredAndSortedSignals.map((signal) => (
				<li key={signal.id}>
					<SignalCard
						signal={signal}
						onClick={onSignalSelect}
					/>
				</li>
			))}
		</SimpleGrid>
	);
}

export const SignalsListBoundary = withQueryBoundary(SignalsList, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
