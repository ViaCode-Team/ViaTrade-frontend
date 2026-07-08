import { StatisticsChartCardSkeleton } from './overview-chart-card.skeleton';
import cls from './statistics-charts.module.css';

export function StatisticsChartsSkeleton() {
	return (
		<div className={cls.chartsGrid}>
			<StatisticsChartCardSkeleton height={360} className={cls.profitCard} />
			<StatisticsChartCardSkeleton />
			<StatisticsChartCardSkeleton />
			<StatisticsChartCardSkeleton />
		</div>
	);
}
