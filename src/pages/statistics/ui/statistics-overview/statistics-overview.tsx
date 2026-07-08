import '@mantine/charts/styles.css';

import { StatisticsControls } from '../statistics-controls/statistics-controls';
import { StatisticsChartsBoundary } from './statistics-charts/statistics-charts';
import cls from './statistics-overview.module.css';

export function StatisticsOverview() {
	return (
		<div className={cls.root}>
			<StatisticsControls />

			<StatisticsChartsBoundary />
		</div>
	);
}
