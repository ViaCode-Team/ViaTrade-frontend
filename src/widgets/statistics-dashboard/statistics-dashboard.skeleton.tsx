import { Skeleton } from '@mantine/core';

import { SummaryCard } from '@/shared/ui/summary-card';

import classes from './statistics-dashboard.module.css';

export function StatisticsDashboardSkeleton() {
	return (
		<div className={classes.root}>
			<div className={classes.metricsGrid}>
				<SummaryCard title='Всего сделок' isLoading />
				<SummaryCard title='Винрейт' isLoading />
				<SummaryCard title='Общая прибыль (PnL)' isLoading />
			</div>

			<div className={classes.chartsGrid}>
				<Skeleton height={300} radius='md' />
				<Skeleton height={300} radius='md' />
				<Skeleton height={300} radius='md' />
			</div>
		</div>
	);
}
