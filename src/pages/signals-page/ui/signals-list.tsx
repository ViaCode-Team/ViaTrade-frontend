import { SimpleGrid } from '@mantine/core';
import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';

import {
	mapStrategyResultResponseToSignals,
	SignalCard,
	useGetResultSuspense,
} from '@/entities/signal';
import { getSignalResultsMock } from '@/entities/signal';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { EmptyState } from '@/shared/ui/empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import type { SignalFilters } from '../model/signal-filters';

import { getFilteredSignals } from '../model/signal-filters';
import { SignalsListSkeleton } from './signals-list.skeleton';

type SignalsListProps = {
	filters: SignalFilters;
	onSignalSelect: (signal: Signal) => void;
};

export function SignalsList({
	filters,
	onSignalSelect,
}: SignalsListProps) {
	const { data: signalsData } = useGetResultSuspense(undefined, {
		query: {
			queryFn: getSignalResultsMock,
			staleTime: Infinity,
			refetchInterval: 60000,
		},
	});
	const signals = useMemo(
		() => mapStrategyResultResponseToSignals(signalsData.data),
		[signalsData.data],
	);
	const filteredAndSortedSignals = useMemo(() => {
		return getFilteredSignals(signals, filters);
	}, [signals, filters]);

	return (
		<>
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

			{filteredAndSortedSignals.length === 0 && (
				<EmptyState
					title='Ничего не найдено'
					description='Попробуйте изменить параметры поиска или фильтры'
				/>
			)}
		</>
	);
}

export const SignalsListBoundary = withQueryBoundary(SignalsList, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
