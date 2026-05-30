import { Card, Flex, Skeleton, Stack } from '@mantine/core';

import { createSkeletons } from '@/shared/lib/skeleton';
import { CONTENT_GRID_SPACING } from '@/shared/model/layout';

export function DashboardNotesSkeleton() {
	return (
		<Flex
			direction='column'
			component='ul'
			gap={CONTENT_GRID_SPACING}
		>
			{createSkeletons(4).map((item) => (
				<li key={item.id} style={{ minWidth: 0, height: '100%' }}>
					<Card withBorder p='md'>
						<Stack gap='sm'>
							<Skeleton height={20} width={80} />
							<Skeleton height={24} width='60%' />
							<Skeleton height={60} />
						</Stack>
					</Card>
				</li>
			))}
		</Flex>
	);
}
