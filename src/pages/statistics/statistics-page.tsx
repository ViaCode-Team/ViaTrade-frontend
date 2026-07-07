import { Button } from '@mantine/core';
import { IconTable } from '@tabler/icons-react';
import { Link } from 'react-router';

import { ROUTES } from '@/shared/model';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

import { StatisticsOverview } from './ui/statistics-dashboard';
import { StatisticsSummaryBoundary } from './ui/statistics-summary/statistics-summary';


export function StatisticsPage() {
	return (
		<>
			<PageHeader
				title='Статистика'
				description='Сводка и графики по сделкам и доходу'
				rightSection={(
					<Button
						component={Link}
						to={ROUTES.TRADES}
						variant='light'
						leftSection={<IconTable size={18} />}
					>
						Сделки
					</Button>
				)}
			/>

			<Section>
				<StatisticsSummaryBoundary />
			</Section>

			<Section>
				<StatisticsOverview />
			</Section>
		</>
	);
}
