import type { ReactNode } from 'react';

import { SimpleGrid } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model';

import type { Signal } from '../../model';

import { SignalCard } from '../signal-card';

export type SignalsListProps = {
	signals: Signal[];
	onSignalSelect: (signal: Signal) => void;
	renderAction?: (signal: Signal) => ReactNode;
};

export function SignalsList({
	signals,
	onSignalSelect,
	renderAction,
}: SignalsListProps) {
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
						action={renderAction?.(signal)}
					/>
				</li>
			))}
		</SimpleGrid>
	);
}
