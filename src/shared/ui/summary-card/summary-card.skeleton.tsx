import { Card, Skeleton, Stack } from '@mantine/core';

import cls from './summary-card.module.css';

export function SummaryCardSkeleton() {
	return (
		<Card withBorder p={{ base: 'sm', sm: 'md' }} className={cls.card}>
			<Stack gap={4} justify='center'>
				<Skeleton height={18} width='50%' />
				<Skeleton height={28} width='40%' />
				<Skeleton height={18} width='60%' />
			</Stack>
		</Card>
	);
}
