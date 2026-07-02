import { Stack } from '@mantine/core';

import { PageHeader } from '@/shared/ui/page-header';
import { Section } from '@/shared/ui/section';

import { TradesHistory } from './ui/trades-history';

export function TradesPage() {
	return (
		<Stack>
			<PageHeader
				title='Сделки'
				description='Журнал сделок с поиском, фильтрами и сортировкой'
			/>

			<Section>
				<TradesHistory />
			</Section>
		</Stack>
	);
}
