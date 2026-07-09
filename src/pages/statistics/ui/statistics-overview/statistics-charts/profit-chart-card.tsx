import { AreaChart } from '@mantine/charts';
import { Card, Flex, Text, Title } from '@mantine/core';
import clsx from 'clsx';
import { useMemo } from 'react';

import { AppEmptyState } from '@/shared/ui/app-empty-state';
import { withQueryBoundary } from '@/shared/ui/queryBoundary';

import { getProfitChartData } from '../../../model/profit-chart-settings';
import { formatChartCurrency } from '../../../model/statistics';
import { useProfitChartData } from '../../../model/use-profit-chart-data';
import { StatisticsChartCardSkeleton } from './overview-chart-card.skeleton';
import cls from './statistics-charts.module.css';

export function ProfitChartCard() {
	const { trades, settings } = useProfitChartData();
	const data = useMemo(
		() => getProfitChartData(trades, settings.granularity),
		[settings.granularity, trades],
	);

	return (
		<Card withBorder className={clsx(cls.chartCard, cls.profitCard)}>
			<Flex direction='column'>
				<Title order={4}>Прибыль</Title>
				<Text size='sm' c='dimmed'>Ваша прибыль и убытки с течением времени</Text>
			</Flex>

			{data.length > 0
				? (
						<AreaChart
							h={300}
							data={data}
							dataKey='date'
							series={[{ name: 'Сумма', color: 'indigo.6' }]}
							curveType='monotone'
							valueFormatter={formatChartCurrency}
						/>
					)
				: (
						<AppEmptyState
							title='Нет данных за период'
							description='Измените начало, конец или период графика.'
						/>
					)}
		</Card>
	);
}

export const ProfitChartCardBoundary = withQueryBoundary(ProfitChartCard, {
	suspenseProps: {
		fallback: <StatisticsChartCardSkeleton height={360} className={cls.profitCard} />,
	},
});
