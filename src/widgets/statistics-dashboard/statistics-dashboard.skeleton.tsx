import { Skeleton } from '@mantine/core';

import cls from './statistics-dashboard.module.css';

export function StatisticsDashboardSkeleton() {
	return (
		<div className={cls.root}>
			<div className={cls.chartsGrid}>
				<Skeleton height={300} radius='md' />
				<Skeleton height={300} radius='md' />
				<Skeleton height={300} radius='md' />
			</div>
		</div>
	);
}
