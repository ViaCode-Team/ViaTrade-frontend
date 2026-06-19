import { SimpleGrid } from '@mantine/core';

import type { Signal } from '@/entities/signal';

import { SignalCard } from '@/entities/signal';
import { CONTENT_GRID_SPACING } from '@/shared/model';
import { EmptyState } from '@/shared/ui/empty-state';

export { SignalsListSkeleton } from './signals-list.skeleton';

export type SignalsListProps = {
	signals: Signal[];
	hasAnySignals: boolean;
	onSignalSelect: (signal: Signal) => void;
};

export function SignalsList({
	signals,
	hasAnySignals,
	onSignalSelect,
}: SignalsListProps) {
	if (!hasAnySignals) {
		return <EmptyState title='Сигналы отсутствуют' description='Привяжите акции к стратегии, чтобы начать получать сигналы.' />;
	}

	if (signals.length === 0) {
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
			{signals.map((signal) => (
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
