import { Skeleton } from '@mantine/core';

import classes from './statistics-dashboard.module.css';

export function StatisticsDashboardSkeleton() {
	return (
		<div className={classes.root}>
			<div className={classes.chartsGrid}>
				<Skeleton height={300} radius='md' />
				<Skeleton height={300} radius='md' />
				<Skeleton height={300} radius='md' />
			</div>
		</div>
	);
}
