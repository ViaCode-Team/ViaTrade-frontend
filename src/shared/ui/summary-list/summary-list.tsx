import { SimpleGrid, type SimpleGridProps } from '@mantine/core';

import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export type SummaryListProps = {} & SimpleGridProps;

export function SummaryList(props: SummaryListProps) {
	return (
		<SimpleGrid minColWidth={300} spacing={CONTENT_GRID_SPACING} autoFlow='auto-fit' {...props} />
	);
}
