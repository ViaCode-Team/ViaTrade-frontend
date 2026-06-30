import { Stack } from '@mantine/core';

import { AddTradeButton } from '@/features/statistic/add';
import { ROUTES } from '@/shared/model';
import { BackLink } from '@/shared/ui/back-link';
import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

import { TradesHistory } from './ui/trades-history';

export function StatisticsHistoryPage() {
	return (
		<Stack>
			<BackLink to={ROUTES.STATISTICS}>К графикам</BackLink>

			<PageHeader
				title='История сделок'
				description='Журнал сделок с поиском, фильтрами и сортировкой'
				rightSection={<AddTradeButton />}
			/>

			<Section>
				<TradesHistory />
			</Section>
		</Stack>
	);
}
