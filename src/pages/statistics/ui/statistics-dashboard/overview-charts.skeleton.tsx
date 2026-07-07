import { OverviewChartCardSkeleton } from './overview-chart-card.skeleton';
import cls from './statistics-dashboard.module.css';

export function OverviewChartsSkeleton() {
	return (
		<div className={cls.chartsGrid}>
			<OverviewChartCardSkeleton height={360} className={cls.profitCard} />
			<OverviewChartCardSkeleton />
			<OverviewChartCardSkeleton />
			<OverviewChartCardSkeleton />
		</div>
	);
}
