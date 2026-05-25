import type { ReactNode } from 'react';

import { SimpleGrid } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export type SummaryListProps = {
	children: ReactNode;
};

export function SummaryList({ children }: SummaryListProps) {
	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING}>
			{children}
		</SimpleGrid>
	);
}
