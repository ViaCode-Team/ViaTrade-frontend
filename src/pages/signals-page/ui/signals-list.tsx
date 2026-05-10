import { SimpleGrid, Stack, Text, Title } from '@mantine/core';
import { useMemo } from 'react';

import type { Signal } from '@/entities/signal';

import {
	mapStrategyResultResponseToSignals,
	SignalCard,
	useGetResultSuspense,
} from '@/entities/signal';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import type { SignalFilters } from '../model/signal-filters';

import { getSignalResultsMock } from '../api/signal-results.mock';
import { getFilteredSignals } from '../model/signal-filters';
import cls from '../signals-page.module.css';
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
		<Stack>
			<Text size='sm' c='dimmed'>
				Найдено сигналов:
				<Text span fw='bold' c='var(--mantine-color-text)'>
					{' '}
					{filteredAndSortedSignals.length}
				</Text>
			</Text>

			<SimpleGrid
				minColWidth={300}
				spacing={CONTENT_GRID_SPACING}
				component='ul'
			>
				{filteredAndSortedSignals.map((signal) => (
					<li key={signal.id} className={cls.signalItem}>
						<SignalCard
							signal={signal}
							onClick={onSignalSelect}
						/>
					</li>
				))}
			</SimpleGrid>

			{filteredAndSortedSignals.length === 0 && (
				<Stack gap='xs' justify='center' className={cls.emptyState}>
					<Title order={4}>
						Ничего не найдено
					</Title>
					<Text size='sm' c='dimmed'>
						Попробуйте изменить параметры поиска или фильтры
					</Text>
				</Stack>
			)}
		</Stack>
	);
}

export const SignalsListBoundary = withQueryBoundary(SignalsList, {
	suspenseProps: {
		fallback: <SignalsListSkeleton />,
	},
});
