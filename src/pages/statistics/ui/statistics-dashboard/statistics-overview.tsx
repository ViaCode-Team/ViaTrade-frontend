import '@mantine/charts/styles.css';

import { OverviewChartsBoundary } from './overview-charts';
import { StatisticsDashboardControls } from './statistics-dashboard-controls';
import cls from './statistics-dashboard.module.css';

export function StatisticsOverview() {
	return (
		<div className={cls.root}>
			<StatisticsDashboardControls />
			<OverviewChartsBoundary />
		</div>
	);
}
